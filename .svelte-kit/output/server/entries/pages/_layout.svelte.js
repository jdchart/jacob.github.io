import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { b as base } from "../../chunks/paths.js";
const css$4 = {
  code: "img.svelte-1cao3mg{height:30px;padding-left:0.2em}a.svelte-1cao3mg:hover{cursor:pointer}",
  map: '{"version":3,"file":"LogoImage.svelte","sources":["LogoImage.svelte"],"sourcesContent":["<script>\\n    export let src;\\n    export let alt = \\"\\";\\n    export let link;\\n<\/script>\\n\\n<a href={link} >\\n<img src={src} alt={alt} >\\n</a>\\n\\n<style>\\n\\n    img{\\n        height: 30px;\\n        padding-left: 0.2em;\\n    }\\n\\n    a:hover{\\n        cursor: pointer;\\n    }\\n</style>"],"names":[],"mappings":"AAYI,kBAAG,CACC,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,KAClB,CAEA,gBAAC,MAAM,CACH,MAAM,CAAE,OACZ"}'
};
const LogoImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { alt = "" } = $$props;
  let { link } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  $$result.css.add(css$4);
  return `<a${add_attribute("href", link, 0)} class="svelte-1cao3mg"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="svelte-1cao3mg"> </a>`;
});
const css$3 = {
  code: "footer.svelte-v2badq{align-items:center;width:100%;position:absolute;z-index:9;bottom:0px;padding:0.5em;transition-duration:200ms;background-color:white;display:flex;flex-wrap:wrap;gap:1em;justify-content:center;align-items:center}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script>\\n    import LogoImage from '$lib/components/LogoImage.svelte';\\n    import { base } from '$app/paths';\\n<\/script>\\n\\n<footer>\\n    <LogoImage \\n        src = \\"logos/cc-black.png\\"\\n        alt = \\"creative commons logo\\"\\n        link = \\"https://creativecommons.org/\\"\\n    />\\n\\n    <LogoImage \\n        src = \\"logos/erc-black.png\\"\\n        alt = \\"european research council logo\\"\\n        link = \\"https://www.horizon-europe.gouv.fr/erc\\"\\n    />\\n\\n    <LogoImage \\n        src = \\"logos/europe-black.png\\"\\n        alt = \\"european union logo\\"\\n        link = \\"\\"\\n    />\\n\\n    <LogoImage \\n        src = \\"logos/R2-black.png\\"\\n        alt = \\"rennes 2 logo\\"\\n        link = \\"https://www.univ-rennes2.fr/\\"\\n    />\\n\\n\\n    <!-- <div class=\\"right_content\\">\\n        <a href=\\"{base}/terms\\">Terms</a>\\n    </div> -->\\n\\n</footer>\\n\\n<style>\\n\\n    .right_content{\\n        position: absolute;\\n        top:0;\\n        right:0;\\n        /*height: 100%;*/\\n        align-items: center;\\n        display: flex;\\n        gap: 0.5em;\\n        flex-wrap: wrap;\\n        padding-right: 1em;\\n        /* padding-top: 0.5em; */\\n        height: 100%;\\n    }\\n\\n    a{\\n        text-decoration: underline;\\n        color: black;\\n        \\n    }\\n    a:hover{\\n        cursor: pointer;\\n        color: grey;\\n    }\\n\\n\\n    footer{\\n        align-items: center;\\n        width: 100%;\\n        position: absolute;\\n        z-index: 9;\\n        bottom: 0px;\\n        padding: 0.5em;\\n        /* opacity: 0.5; */\\n\\n        transition-duration: 200ms;\\n        background-color: white;\\n        /* background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgb(0, 0, 0, 1) 99%); */\\n\\n        display: flex;\\n        flex-wrap: wrap;\\n        gap: 1em;\\n        justify-content: center; /* Horizontally centers the child */\\n  align-items: center;  \\n    }\\n</style>"],"names":[],"mappings":"AAgEI,oBAAM,CACF,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,KAAK,CAGd,mBAAmB,CAAE,KAAK,CAC1B,gBAAgB,CAAE,KAAK,CAGvB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,GAAG,CACR,eAAe,CAAE,MAAM,CAC7B,WAAW,CAAE,MACX"}`
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<footer class="svelte-v2badq">${validate_component(LogoImage, "LogoImage").$$render(
    $$result,
    {
      src: "logos/cc-black.png",
      alt: "creative commons logo",
      link: "https://creativecommons.org/"
    },
    {},
    {}
  )} ${validate_component(LogoImage, "LogoImage").$$render(
    $$result,
    {
      src: "logos/erc-black.png",
      alt: "european research council logo",
      link: "https://www.horizon-europe.gouv.fr/erc"
    },
    {},
    {}
  )} ${validate_component(LogoImage, "LogoImage").$$render(
    $$result,
    {
      src: "logos/europe-black.png",
      alt: "european union logo",
      link: ""
    },
    {},
    {}
  )} ${validate_component(LogoImage, "LogoImage").$$render(
    $$result,
    {
      src: "logos/R2-black.png",
      alt: "rennes 2 logo",
      link: "https://www.univ-rennes2.fr/"
    },
    {},
    {}
  )}  </footer>`;
});
const css$2 = {
  code: "a.svelte-1sa8qwp{font-size:1em;color:black}a.svelte-1sa8qwp:hover{color:grey}.container.svelte-1sa8qwp{padding-bottom:0.5em;padding-top:0.5em;padding-left:0.5em}@media(min-width: 1200px){a.svelte-1sa8qwp{font-size:1em}}@media(max-width: 1200px){a.svelte-1sa8qwp{font-size:0.75em}}",
  map: '{"version":3,"file":"TopMenuButton.svelte","sources":["TopMenuButton.svelte"],"sourcesContent":["<script>\\n    export let label = \\"\\";\\n    export let link = \\"\\";\\n<\/script>\\n\\n<div class=\\"container\\">\\n    <a href={link}>{label}</a>\\n</div>\\n\\n<style>\\n    a{\\n        font-size: 1em;\\n        color: black;\\n    }\\n\\n    a:hover{\\n        color: grey;\\n    }\\n\\n    .container{\\n        padding-bottom: 0.5em;\\n        padding-top: 0.5em;\\n        padding-left: 0.5em;\\n    }\\n\\n    @media (min-width: 1200px) {\\n        a{\\n            font-size: 1em;\\n        }\\n    }\\n\\n    @media (max-width: 1200px) {\\n        a{\\n            font-size: 0.75em;\\n        }\\n    }\\n</style>"],"names":[],"mappings":"AAUI,gBAAC,CACG,SAAS,CAAE,GAAG,CACd,KAAK,CAAE,KACX,CAEA,gBAAC,MAAM,CACH,KAAK,CAAE,IACX,CAEA,yBAAU,CACN,cAAc,CAAE,KAAK,CACrB,WAAW,CAAE,KAAK,CAClB,YAAY,CAAE,KAClB,CAEA,MAAO,YAAY,MAAM,CAAE,CACvB,gBAAC,CACG,SAAS,CAAE,GACf,CACJ,CAEA,MAAO,YAAY,MAAM,CAAE,CACvB,gBAAC,CACG,SAAS,CAAE,MACf,CACJ"}'
};
const TopMenuButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  let { link = "" } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  $$result.css.add(css$2);
  return `<div class="container svelte-1sa8qwp"><a${add_attribute("href", link, 0)} class="svelte-1sa8qwp">${escape(label)}</a> </div>`;
});
const css$1 = {
  code: "nav.svelte-191m3jp{display:flex;align-items:center;width:100%;position:absolute;z-index:9;top:0px;padding:0.5em;flex-wrap:wrap;justify-content:center;align-items:center;transition-duration:200ms}",
  map: `{"version":3,"file":"TopMenu.svelte","sources":["TopMenu.svelte"],"sourcesContent":["<script>\\n    import { base } from '$app/paths';\\n    import TopMenuButton from '$lib/components/TopMenuButton.svelte';\\n<\/script>\\n\\n<nav>\\n    <TopMenuButton \\n        label = \\"Home\\"\\n        link = \\"{base}/\\"\\n    />\\n\\n    <TopMenuButton \\n        label = \\"Explorer\\"\\n        link = \\"{base}/explorer\\"\\n    />\\n\\n</nav>\\n\\n<style>\\n\\n\\n\\n    .right_content{\\n        position: absolute;\\n        top:0;\\n        right:0;\\n        /*height: 100%;*/\\n        align-items: center;\\n        display: flex;\\n        gap: 0.5em;\\n        flex-wrap: wrap;\\n        padding-right: 1em;\\n        /* padding-top: 0.5em; */\\n        height: 100%;\\n    }\\n\\n    a{\\n        text-decoration: underline;\\n        color: white;\\n        \\n    }\\n    a:hover{\\n        cursor: pointer;\\n        color: grey;\\n    }\\n\\n\\n    nav{\\n        display: flex;\\n        align-items: center;\\n        width: 100%;\\n        \\n        position: absolute;\\n        z-index: 9;\\n        top: 0px;\\n        padding: 0.5em;\\n        flex-wrap: wrap;\\n\\n        justify-content: center; /* Horizontally centers the child */\\n  align-items: center;  \\n\\n        /* border-bottom: solid 1px black; */\\n\\n\\n        transition-duration: 200ms;\\n        /* background-color: black; */\\n        /* background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgb(0, 0, 0, 1) 99%); */\\n    }\\n</style>"],"names":[],"mappings":"AA+CI,kBAAG,CACC,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CAEX,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,GAAG,CAAE,GAAG,CACR,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,IAAI,CAEf,eAAe,CAAE,MAAM,CAC7B,WAAW,CAAE,MAAM,CAKb,mBAAmB,CAAE,KAGzB"}`
};
const TopMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<nav class="svelte-191m3jp">${validate_component(TopMenuButton, "TopMenuButton").$$render($$result, { label: "Home", link: base + "/" }, {}, {})} ${validate_component(TopMenuButton, "TopMenuButton").$$render(
    $$result,
    {
      label: "Explorer",
      link: base + "/explorer"
    },
    {},
    {}
  )} </nav>`;
});
const css = {
  code: ".container.svelte-5qckwi{margin:0;padding:0;width:100vw;height:100vh;overflow:hidden;position:relative}.transition_div.svelte-5qckwi{z-index:1;width:100%;height:100%;display:flex;justify-content:center;align-items:center}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n\\timport './reset.css';\\n\\timport './theme.css';\\n\\timport {fade} from 'svelte/transition';\\n\\timport { base } from '$app/paths';\\n\\texport let data;\\n\\n\\tconsole.log(data.url)\\n\\n\\timport Footer from '$lib/components/Footer.svelte';\\n\\timport TopMenu from '$lib/components/TopMenu.svelte';\\n<\/script>\\n\\n<div class=\\"container\\">\\n\\t{#key data.url}\\n\\t\\t<div class=\\"transition_div\\"\\n\\t\\t\\tin:fade={{x: 0, duration:100, delay:100}}\\n\\t\\t\\tout:fade={{x: 0, duration:100}}\\n\\t\\t>\\n\\t\\t{#if data.url != base + \\"/\\" && data.url != \\"/sveltekit-github-pages/\\" && data.url != \\"/\\" && data.url != base}\\n\\t\\t\\t<TopMenu />\\n\\t\\t{/if}\\n\\t\\t\\t<slot />\\n\\n\\t\\t\\t<Footer />\\n\\t\\t</div>\\n\\n\\t\\t\\n\\t{/key}\\n\\t\\n</div>\\n\\n\\n\\n<style>\\n\\t.container{\\n        margin: 0;\\n\\t\\tpadding: 0;\\n\\t\\twidth: 100vw;\\n\\t\\theight: 100vh;\\n\\t\\toverflow: hidden;\\n\\t\\tposition: relative;\\n    }\\n\\n\\t.transition_div{\\n\\t\\tz-index: 1;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tdisplay: flex;\\n        justify-content: center;\\n        align-items: center;\\n\\t}\\n</style>"],"names":[],"mappings":"AAmCC,wBAAU,CACH,MAAM,CAAE,CAAC,CACf,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,QACR,CAEH,6BAAe,CACd,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACP,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACpB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data.url);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="container svelte-5qckwi"><div class="transition_div svelte-5qckwi">${data.url != base + "/" && data.url != "/sveltekit-github-pages/" && data.url != "/" && data.url != base ? `${validate_component(TopMenu, "TopMenu").$$render($$result, {}, {}, {})}` : ``} ${slots.default ? slots.default({}) : ``} ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div> </div>`;
});
export {
  Layout as default
};
