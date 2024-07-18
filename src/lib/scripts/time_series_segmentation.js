// Kernel size to be proportional to time ?
// Or standardize interpolation ? (done here)

export const process_segmentation = (data, options) => {
    let normalized_data = data.feature_data.map(ts => normalize_time_series(ts));
    let interpolated_feature_data = interpolate_data(normalized_data);
    let weighted_data = apply_weights(interpolated_feature_data, data.weight_data);
    let reshaped = reshape_array(weighted_data);

    let ret;

    if(options.method === "0"){
        let change_points = kernel_change_detection(reshaped, options.kernel_width, options.threshold);
        let in_seconds = slice_points_to_seconds(change_points, data.media_duration, reshaped.length);
        ret = seconds_to_slice_list(in_seconds, data.media_duration);
    };

    return ret;
};

function seconds_to_slice_list(data, full_duration){
    let full_list = [];

    for(var i = 0; i < data.length; i++){
        if(i == 0){
            full_list.push([0, data[0]])
        };
        if(i != data.length - 1){
            full_list.push([data[i], data[i + 1]]);
        }else{
            full_list.push([data[i], full_duration])
        };
    };

    return full_list;
}

function slice_points_to_seconds(slice_data, full_duration, num_frames){
    let frame_duration = full_duration / num_frames;
    return slice_data.map(change_point => change_point * frame_duration);
};

function kernel_change_detection(data, kernel_width, threshold){
    let flat_data = data.map(arr => arr.reduce((a, b) => a + b, 0));

    let change_points = [];
    for (let i = kernel_width; i < flat_data.length - kernel_width; i++) {
        let mean1 = flat_data.slice(i - kernel_width, i).reduce((sum, value) => sum + value, 0) / kernel_width;
        let mean2 = flat_data.slice(i, i + kernel_width).reduce((sum, value) => sum + value, 0) / kernel_width;
        let stdDev1 = Math.sqrt(flat_data.slice(i - kernel_width, i).reduce((sum, value) => sum + Math.pow(value - mean1, 2), 0) / kernel_width);
        let stdDev2 = Math.sqrt(flat_data.slice(i, i + kernel_width).reduce((sum, value) => sum + Math.pow(value - mean2, 2), 0) / kernel_width);

        if (Math.abs(mean1 - mean2) > threshold * stdDev1 || Math.abs(mean1 - mean2) > threshold * stdDev2) {
            change_points.push(i);
        }
    }
    return change_points;
};

function reshape_array(data){
    let composite = [];
    for (let i = 0; i < data[0].length; i++) {
        composite.push(data.map(d => d[i]));
    };

    return composite;
};

function apply_weights(data, weight_data){
    let normed_weights = [];
    weight_data.forEach(weight => {
        normed_weights.push(weight / 1000);
    });
    return data.map((series, i) => series.map(value => value * normed_weights[i]));
};

function normalize_time_series(data){
    let mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    let variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    let stdDev = Math.sqrt(variance);
    return data.map(value => (value - mean) / stdDev);
};

function interpolate_data(feature_data){
    let num_segments = 0;
    feature_data.forEach(feature_array => {
        if(feature_array.length > num_segments){
            num_segments = feature_array.length;
        };
    });

    let interpolated_feature_data = [];
    feature_data.forEach(feature_array => {
        // NOTE: here we interpolate always to 100 slices, but using aove code we could inteprolate
        // always to the longest array.
        interpolated_feature_data.push(interpolate_data_stream(feature_array, 100));
    });

    return interpolated_feature_data;
}

function interpolate_data_stream(data, target_length){
    let interpolated = [];
    let factor = (data.length -1) / (target_length -1);
    for(var i = 0; i < target_length; i++){
        let index = i * factor;
        let lower = Math.floor(index);
        let upper = Math.ceil(index);
        if(lower === upper){
            interpolated.push(data[lower]);
        }
        else{
            let weight = index - lower;
            interpolated.push(data[lower] * (1 - weight) + data[upper] * weight);
        };
    };
    return interpolated;
};