import{B as e,D as t,G as n,L as r,P as i,Q as a,R as o,Z as s,ct as c,l,lt as u,m as d,o as f,s as p,st as m,z as h}from"./RectAreaLightUniformsLib-BJ8e-1RS.js";var g={revision:`bfcf1ab37cc3`,model:{height:3.8,desktop:`../prototype-assets/molar.glb`,compact:`../prototype-assets/molar-mobile.glb`,expectedMeshes:1},renderer:{exposure:1.08,toneMapping:`neutral`,background:`#ffffff`,antialias:!0},material:{enamel:{color:`#eeeae1`,roughness:.33,ior:1.62,normalStrength:.72},root:{color:`#e6ddcc`,roughness:.49,ior:1.47,normalStrength:.82},colorVariation:.014,roughnessVariation:.022,mapReference:{rootRoughness:.49,enamelRoughness:.29,roughnessVariation:.022,roughnessLimits:[.19,.63]},occlusionStrength:.52,clearcoat:0,transmission:0,scattering:{fraction:.065,wrap:.18},micro:{wavelengthToHeight:.0033,amplitudeToHeight:12e-6,rootAmplitudeToHeight:33e-6,rootAxialFrequency:.35,filterFootprintStart:.35,filterFootprintEnd:1},mesoRoughness:{wavelengthToHeight:.6/21,enamelAmplitude:.006,rootAmplitude:.01},clay:{color:`#b4b2ad`,roughness:.65}},lighting:{environment:`../environment/studio-small-09-1k.hdr`,environmentIntensity:.6,environmentRotation:.65,fallbackIntensity:.65,key:{color:`#fffcf7`,intensity:2.4,size:[4.5,5.5],position:[-4.5,5.5,5]},fill:{color:`#ffffff`,intensity:.65,size:[4,6],position:[4,2,-4]},overhead:{color:`#ffffff`,intensity:.65,size:[3.5,2.5],position:[0,7,-1.5]},directional:{color:`#fffaf2`,intensity:.75,position:[-3.8,7,5],shadowBias:-2e-4,shadowNormalBias:.025,shadowRadius:3},shadow:{opacity:.14,color:`#6b6256`,spread:.08,falloff:2.7,gap:.025,extentPadding:1.5}},camera:{fov:32,near:.01,far:100,homeDirection:[.5,.72,1],crownDirection:[.08,1,.18],targetOffset:[0,.04,0],fitPadding:1.16,minimumDistanceScale:1.03,minimumDistanceGap:.08,maxDistanceFactor:2.5,footerBreakpoint:600,footerReservePx:74,footerReserveMaxFraction:.12},interaction:{damping:!0,dampingFactor:.08,rotateSpeed:.65,zoomSpeed:.7,minPolarAngle:.04,maxPolarAngle:3.1,keyboardAzimuthStep:.12,keyboardPolarStep:.1,keyboardZoomFactor:.88},quality:{compactMedia:`(max-width: 600px), (pointer: coarse) and (max-width: 1100px)`,desktop:{pixelRatioCap:1.75,transmissionScale:1,shadowMapSize:2048,contactSize:1024,anisotropy:8,frameBudgetMs:20},compact:{pixelRatioCap:1.5,transmissionScale:.65,shadowMapSize:1024,contactSize:512,anisotropy:4,frameBudgetMs:32},adaptive:{enabled:!0,interactionPixelRatioCap:1.5,interactionTransmissionScale:.65,minimumPixelRatio:.85,frameBudgetMs:30,sampleCount:24,slowFraction:.65,reductionFactor:.82,warmupFrames:6,restoreDelayMs:160}}};function _(e,t,n,{alpha:r=!1}={}){let i=new p({canvas:e,alpha:r,antialias:t.renderer.antialias,powerPreference:`high-performance`});i.setPixelRatio(n.pixelRatio),i.outputColorSpace=s,i.toneMapping=t.renderer.toneMapping===`aces`?4:7,i.toneMappingExposure=t.renderer.exposure,i.transmissionResolutionScale=n.transmissionScale,i.shadowMap.enabled=!0,i.shadowMap.type=1,i.shadowMap.autoUpdate=!1,i.info.autoReset=!1;let o=new a;return o.background=r?null:new d(t.renderer.background),{renderer:i,scene:o}}function v(e){if(!e)return;let t=new Set,n=new Set,r=new Set;e.traverse(e=>{e.geometry&&t.add(e.geometry);for(let t of e.material?Array.isArray(e.material)?e.material:[e.material]:[])n.add(t)});for(let e of n){for(let t of Object.values(e))t?.isTexture&&r.add(t);for(let t of Object.values(e.userData.ownedUniforms??{}))t.value?.isTexture&&r.add(t.value);e.dispose()}let i=new Set;for(let e of r)e.source?.data?.close&&i.add(e.source.data),e.dispose();for(let e of i)e.close();for(let e of t)e.dispose();e.removeFromParent()}async function y(e,t,n){let r=await fetch(e,{signal:t});if(!r.ok)throw Error(`Asset HTTP ${r.status}: ${new URL(e).pathname}`);if(!r.body||!n)return r.arrayBuffer();let i=Number(r.headers.get(`content-length`)),a=r.body.getReader(),o=[],s=0;for(;;){let{done:e,value:t}=await a.read();if(e)break;o.push(t),s+=t.byteLength,n(i>0?Math.min(100,Math.round(s/i*100)):null)}let c=new Uint8Array(s),l=0;for(let e of o)c.set(e,l),l+=e.byteLength;return c.buffer}var b=`
uniform sampler2D toothRegions;
uniform vec3 toothEnamelColor;
uniform vec3 toothRootColor;
uniform vec2 toothRoughness;
uniform vec2 toothIOR;
uniform vec2 toothNormalStrength;
uniform vec2 toothRoughnessReference;
uniform vec2 toothRoughnessLimits;
uniform float toothColorVariation;
uniform float toothRoughnessVariation;
uniform float toothOcclusionStrength;
uniform float toothScatterFraction;
uniform float toothScatterWrap;
uniform vec4 toothMicro;
uniform vec2 toothFilterFootprint;
uniform vec3 toothMesoRoughness;
varying vec2 vToothUv;
varying vec3 vToothPosition;
float toothCrown;
vec4 toothRegion;
float toothHash(vec3 p) {
  return fract(sin(dot(p, vec3(37.17, 91.73, 61.29)) + 0.013 * p.x * p.z) * 10013.873);
}
float toothMicroNoise(vec3 p) {
  vec3 c = floor(p);
  vec3 f = fract(p);
  vec3 w = f * f * (3.0 - 2.0 * f);
  float a = mix(toothHash(c), toothHash(c + vec3(1,0,0)), w.x);
  float b = mix(toothHash(c + vec3(0,1,0)), toothHash(c + vec3(1,1,0)), w.x);
  float d = mix(toothHash(c + vec3(0,0,1)), toothHash(c + vec3(1,0,1)), w.x);
  float e = mix(toothHash(c + vec3(0,1,1)), toothHash(c + vec3(1,1,1)), w.x);
  return mix(mix(a,b,w.y), mix(d,e,w.y), w.z);
}
float toothDetailWeight(vec3 cellPosition) {
  return 1.0 - smoothstep(toothFilterFootprint.x, toothFilterFootprint.y, length(fwidth(cellPosition)));
}
`;function x(e,t,n){if(!e.includes(t))throw Error(`Three.js r186: missing tooth shader hook ${t}`);return e.replace(t,n)}function S(e,t,n,r,i=!1){let a=0;if(e.traverse(e=>{if(!e.isMesh)return;if(a++,Array.isArray(e.material))throw Error(`Prototype expects one continuous exterior material per mesh.`);let s=e.material,l=s.roughnessMap,p=s.normalMap;if(!l||!p)throw Error(`Model must include region/roughness data and a tangent-space normal map.`);l.colorSpace=``,p.colorSpace=``,l.anisotropy=p.anisotropy=Math.min(t.quality[n.compact?`compact`:`desktop`].anisotropy,r.capabilities.getMaxAnisotropy());let{micro:h,mesoRoughness:g}=t.material,_=t.model.height,v={toothRegions:{value:l},toothEnamelColor:{value:new d(t.material.enamel.color)},toothRootColor:{value:new d(t.material.root.color)},toothRoughness:{value:new m(t.material.root.roughness,t.material.enamel.roughness)},toothIOR:{value:new m(t.material.root.ior,t.material.enamel.ior)},toothNormalStrength:{value:new m(t.material.root.normalStrength,t.material.enamel.normalStrength)},toothRoughnessReference:{value:new m(t.material.mapReference.rootRoughness,t.material.mapReference.enamelRoughness)},toothRoughnessLimits:{value:new m(...t.material.mapReference.roughnessLimits)},toothColorVariation:{value:t.material.colorVariation},toothRoughnessVariation:{value:t.material.roughnessVariation/t.material.mapReference.roughnessVariation},toothOcclusionStrength:{value:t.material.occlusionStrength},toothScatterFraction:{value:t.material.scattering.fraction},toothScatterWrap:{value:t.material.scattering.wrap},toothMicro:{value:new u(h.wavelengthToHeight*_,h.amplitudeToHeight*_,h.rootAmplitudeToHeight*_,h.rootAxialFrequency)},toothFilterFootprint:{value:new m(h.filterFootprintStart,h.filterFootprintEnd)},toothMesoRoughness:{value:new c(g.wavelengthToHeight*_,g.enamelAmplitude,g.rootAmplitude)}},y=new o({name:i?`Neutral clay — geometry review`:`Ivory enamel and matte cementum — one continuous surface`,color:i?t.material.clay.color:16777215,roughness:i?t.material.clay.roughness:1,normalMap:i?null:p,metalness:0,opacity:1,transparent:!1,ior:t.material.enamel.ior,clearcoat:t.material.clearcoat,transmission:t.material.transmission,dithering:!0});y.userData.ownedUniforms=v,y.userData.approximation=`Opaque enamel body, 6.5% direct-light diffuse wrap; not volumetric SSS or measured tissue optics.`,i||(y.onBeforeCompile=e=>{Object.assign(e.uniforms,v),e.vertexShader=x(e.vertexShader,`#include <common>`,`#include <common>
varying vec2 vToothUv;
varying vec3 vToothPosition;`),e.vertexShader=x(e.vertexShader,`#include <uv_vertex>`,`#include <uv_vertex>
vToothUv = uv;`),e.vertexShader=x(e.vertexShader,`#include <project_vertex>`,`#include <project_vertex>
vToothPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=x(e.fragmentShader,`#include <common>`,`#include <common>\n${b}`),e.fragmentShader=x(e.fragmentShader,`#include <color_fragment>`,`
          #include <color_fragment>
          toothRegion = texture2D(toothRegions, vToothUv);
          toothCrown = toothRegion.r;
          diffuseColor.rgb *= mix(toothRootColor, toothEnamelColor, toothCrown);
          diffuseColor.rgb += (toothRegion.b - 0.5) * toothColorVariation;
        `),e.fragmentShader=x(e.fragmentShader,`#include <roughnessmap_fragment>`,`
          float roughnessFactor = mix(toothRoughness.x, toothRoughness.y, toothCrown);
          // The authored G map is centered on its regional reference values.
          float roughnessReference = mix(toothRoughnessReference.x, toothRoughnessReference.y, toothCrown);
          roughnessFactor += (toothRegion.g - roughnessReference) * toothRoughnessVariation;
          // A separate, zero-centred illustrative field modulates only roughness.
          vec3 mesoP = vToothPosition / toothMesoRoughness.x;
          float mesoVariation = (2.0 * toothMicroNoise(mesoP) - 1.0) * toothDetailWeight(mesoP);
          roughnessFactor += mesoVariation * mix(toothMesoRoughness.z, toothMesoRoughness.y, toothCrown);
          roughnessFactor = clamp(roughnessFactor, toothRoughnessLimits.x, toothRoughnessLimits.y);
        `),e.fragmentShader=x(e.fragmentShader,`#include <normal_fragment_maps>`,f.normal_fragment_maps.replace(`mapN.xy *= normalScale;`,`mapN.xy *= normalScale * mix(toothNormalStrength.x, toothNormalStrength.y, toothCrown);`)+`
          // Both illustrative fields stay continuous across UV seams. Cementum
          // uses a longer axial cell; neither field contains growth bands.
          vec3 enamelP = vToothPosition / toothMicro.x;
          vec3 rootP = enamelP * vec3(1.0, toothMicro.w, 1.0);
          float enamelH = toothMicroNoise(enamelP) - 0.5;
          float rootH = toothMicroNoise(rootP) - 0.5;
          // Differentiate only the raw heights. Differentiating the footprint
          // would require undefined second derivatives; differentiating the
          // crown mask would introduce a spurious height ridge at the neck.
          vec2 enamelSlope = vec2(dFdx(enamelH), dFdy(enamelH)) * toothMicro.y * toothDetailWeight(enamelP);
          vec2 rootSlope = vec2(dFdx(rootH), dFdy(rootH)) * toothMicro.z * toothDetailWeight(rootP);
          vec2 slope = mix(rootSlope, enamelSlope, toothCrown);
          vec3 surfaceX = dFdx(-vViewPosition);
          vec3 surfaceY = dFdy(-vViewPosition);
          vec3 gradientX = cross(surfaceY, normal);
          vec3 gradientY = cross(normal, surfaceX);
          float determinant = dot(surfaceX, gradientX);
          vec3 surfaceGradient = sign(determinant) * (slope.x * gradientX + slope.y * gradientY);
          if (abs(determinant) > 1e-12) normal = normalize(abs(determinant) * normal - surfaceGradient);
        `),e.fragmentShader=x(e.fragmentShader,`#include <lights_physical_fragment>`,f.lights_physical_fragment.replace(`material.ior = ior;`,`material.ior = mix(toothIOR.x, toothIOR.y, toothCrown);`));let t=x(f.lights_physical_pars_fragment,`reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );`,`
          float wrappedCosine = max(dot(geometryNormal, directLight.direction) + toothScatterWrap, 0.0) / pow(1.0 + toothScatterWrap, 2.0);
          vec3 bodyIrradiance = mix(irradiance, directLight.color * wrappedCosine, toothScatterFraction * toothCrown);
          reflectedLight.directDiffuse += bodyIrradiance * BRDF_Lambert(material.diffuseContribution) * (1.0 - F);
        `);e.fragmentShader=x(e.fragmentShader,`#include <lights_physical_pars_fragment>`,t),e.fragmentShader=x(e.fragmentShader,`#include <aomap_fragment>`,`
          float toothAO = mix(1.0, toothRegion.a, toothOcclusionStrength);
          reflectedLight.indirectDiffuse *= toothAO;
          #if defined(USE_ENVMAP)
            reflectedLight.indirectSpecular *= computeSpecularOcclusion(saturate(dot(geometryNormal, geometryViewDir)), toothAO, material.roughness);
          #endif
        `)},y.customProgramCacheKey=()=>`zub-continuous-ivory-r186-v2`),e.material=y,e.castShadow=!0,e.receiveShadow=!0,s.dispose();let S=new Set([l,p]);for(let e of Object.values(s))e?.isTexture&&!S.has(e)&&(e.source?.data?.close?.(),e.dispose())}),a!==t.model.expectedMeshes)throw Error(`Expected one tooth exterior; received ${a} meshes.`)}var C=class extends a{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let r=new l;r.deleteAttribute(`uv`);let a=new h({side:1}),o=new h,s=new n(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let c=new i(r,a);c.position.set(-.757,13.219,.717),c.scale.set(31.713,28.305,28.591),this.add(c);let u=new t(r,o,6),d=new e;d.position.set(-10.906,2.009,1.846),d.rotation.set(0,-.195,0),d.scale.set(2.328,7.905,4.651),d.updateMatrix(),u.setMatrixAt(0,d.matrix),d.position.set(-5.607,-.754,-.758),d.rotation.set(0,.994,0),d.scale.set(1.97,1.534,3.955),d.updateMatrix(),u.setMatrixAt(1,d.matrix),d.position.set(6.167,.857,7.803),d.rotation.set(0,.561,0),d.scale.set(3.927,6.285,3.687),d.updateMatrix(),u.setMatrixAt(2,d.matrix),d.position.set(-2.017,.018,6.124),d.rotation.set(0,.333,0),d.scale.set(2.002,4.566,2.064),d.updateMatrix(),u.setMatrixAt(3,d.matrix),d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),d.updateMatrix(),u.setMatrixAt(4,d.matrix),d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),d.updateMatrix(),u.setMatrixAt(5,d.matrix),this.add(u);let f=new i(r,w(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);let p=new i(r,w(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);let m=new i(r,w(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let g=new i(r,w(43));g.position.set(-.462,8.89,14.52),g.scale.set(4.38,5.441,.088),this.add(g);let _=new i(r,w(20));_.position.set(3.235,11.486,-12.541),_.scale.set(2.5,2,.1),this.add(_);let v=new i(r,w(100));v.position.set(0,20,0),v.scale.set(1,.1,1),this.add(v)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function w(e){return new r({color:0,emissive:16777215,emissiveIntensity:e})}function T(e){let t=window.matchMedia(e.quality.compactMedia).matches,n=t?e.quality.compact:e.quality.desktop;return Object.freeze({...n,name:t?`compact`:`desktop`,compact:t,pixelRatio:Math.min(window.devicePixelRatio||1,n.pixelRatioCap)})}function E({renderer:e,profile:t,requestRender:n,config:r}){let i=r.quality.adaptive,a=!1,o=!1,s,c=0,l=0,u=i.warmupFrames,d=t.pixelRatio,f=t.transmissionScale,p=Math.min(t.pixelRatio,i.interactionPixelRatioCap);function m(t,r){if(o)return;let i=d!==t||f!==r;d=t,f=r,e.getPixelRatio()!==d&&e.setPixelRatio(d),e.transmissionResolutionScale=f,i&&n()}function h(){!o&&i.enabled&&(clearTimeout(s),!a&&(a=!0,c=0,l=0,u=i.warmupFrames,m(p,Math.min(t.transmissionScale,i.interactionTransmissionScale))))}function g(){!o&&i.enabled&&a&&(a=!1,clearTimeout(s),s=setTimeout(()=>{!a&&!o&&m(t.pixelRatio,t.transmissionScale)},i.restoreDelayMs))}function _(e){o||!i.enabled||!a||!Number.isFinite(e)||e<=0||(u>0?--u:(c+=1,e>(t.frameBudgetMs??i.frameBudgetMs)&&(l+=1),!(c<i.sampleCount)&&(l/c>=i.slowFraction&&(p=Math.max(Math.min(t.pixelRatio,i.minimumPixelRatio),d*i.reductionFactor),m(p,f),u=i.warmupFrames),c=0,l=0)))}function v(){o||(o=!0,clearTimeout(s))}return m(t.pixelRatio,t.transmissionScale),{beginInteraction:h,endInteraction:g,recordFrame:_,dispose:v}}export{y as a,g as c,S as i,E as n,_ as o,C as r,v as s,T as t};