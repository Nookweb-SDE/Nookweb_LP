import{j as t,ap as m,r as n,aq as u,ar as l,as as p,at as x,au as d,av as f}from"./index-BHegtwlP.js";d(f);function y(){const s=n.useRef(null),o=n.useRef(null),{geometry:c,shaderArgs:v}=n.useMemo(()=>{const e=new u(12,12,128,128),a={uniforms:{uTime:{value:0},uStrength:{value:1.5},uColor1:{value:new l("#00d4ff")},uColor2:{value:new l("#0a0e14")},uColor3:{value:new l("#8B5CF6")}},vertexShader:`
      uniform float uTime;
      uniform float uStrength;
      varying vec2 vUv;
      varying float vDisplacement;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float noise = snoise(vec3(pos.x * 0.5, pos.y * 0.5, uTime * 0.15));
        float noise2 = snoise(vec3(pos.x * 1.0 + 100.0, pos.y * 1.0, uTime * 0.1));
        float displacement = (noise * 0.6 + noise2 * 0.4) * uStrength;
        vDisplacement = displacement;
        pos.z += displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;
      varying float vDisplacement;

      void main() {
        // Mix colors based on displacement and UV
        float mixFactor = smoothstep(-1.0, 1.0, vDisplacement);
        vec3 color = mix(uColor1, uColor2, mixFactor);

        // Add subtle third color at peaks
        float peak = smoothstep(0.5, 1.0, abs(vDisplacement));
        color = mix(color, uColor3, peak * 0.4);

        // Edge fade
        float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x)
                       * smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

        // Subtle grid lines
        float gridX = abs(fract(vUv.x * 20.0) - 0.5) * 2.0;
        float gridY = abs(fract(vUv.y * 20.0) - 0.5) * 2.0;
        float grid = smoothstep(0.95, 1.0, max(gridX, gridY)) * 0.08;

        float alpha = edgeFade * (0.3 + mixFactor * 0.2) + grid;
        gl_FragColor = vec4(color, alpha);
      }
    `,transparent:!0,side:p,depthWrite:!1};return{geometry:e,shaderArgs:a}},[]);return x(({clock:e})=>{o.current&&(o.current.uniforms.uTime.value=e.getElapsedTime()),s.current&&(s.current.rotation.x=-.4+Math.sin(e.getElapsedTime()*.1)*.05,s.current.rotation.z=Math.sin(e.getElapsedTime()*.05)*.1)}),t.jsx("mesh",{ref:s,geometry:c,position:[0,0,-2],children:t.jsx("shaderMaterial",{ref:o,attach:"material",args:[v]})})}function h(){const s=n.useRef(null),o=200,{positions:c,sizes:v}=n.useMemo(()=>{const e=new Float32Array(o*3),i=new Float32Array(o);for(let r=0;r<o;r++)e[r*3]=(Math.random()-.5)*16,e[r*3+1]=(Math.random()-.5)*16,e[r*3+2]=(Math.random()-.5)*8-2,i[r]=Math.random()*2+.5;return{positions:e,sizes:i}},[]);return x(({clock:e})=>{if(!s.current)return;const i=e.getElapsedTime(),r=s.current.geometry.attributes.position.array;for(let a=0;a<o;a++)r[a*3+1]+=Math.sin(i*.3+a)*.002,r[a*3]+=Math.cos(i*.2+a*.5)*.001;s.current.geometry.attributes.position.needsUpdate=!0}),t.jsxs("points",{ref:s,children:[t.jsxs("bufferGeometry",{children:[t.jsx("bufferAttribute",{attach:"attributes-position",args:[c,3],count:o}),t.jsx("bufferAttribute",{attach:"attributes-size",args:[v,1],count:o})]}),t.jsx("pointsMaterial",{size:.03,color:"#00d4ff",transparent:!0,opacity:.4,sizeAttenuation:!0,depthWrite:!1})]})}const z=()=>t.jsxs(m,{dpr:[1,1.5],camera:{position:[0,0,6],fov:50},style:{position:"absolute",inset:0},gl:{alpha:!0,antialias:!0},children:[t.jsx("ambientLight",{intensity:.3}),t.jsx(y,{}),t.jsx(h,{})]});export{z as default};
