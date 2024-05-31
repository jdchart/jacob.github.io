<script>
    export let src;
    export let alt = "";
    export let link;
</script>

<a href={link} >
<img src={src} alt={alt} >
</a>

<style>

    img{
        height: 30px;
        padding-left: 0.2em;
    }

    a:hover{
        cursor: pointer;
    }
</style>