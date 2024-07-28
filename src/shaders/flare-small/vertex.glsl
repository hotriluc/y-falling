varying vec2 vUv;
varying float vAngle;

uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec3 newPos = position;
       newPos += normal * ((1. + sin(uTime)) * .5) ;


    vec4 modelPosition = modelMatrix * vec4(newPos, 1.);


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = 1. * uResolution.y ;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vUv = uv;
}