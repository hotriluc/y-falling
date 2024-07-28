#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uTime;
uniform float uLength;
uniform float uThickness;
uniform float uRotation;
uniform float uClockwise;
uniform float uXFrequency;
uniform float uYFrequency;

uniform vec3 uColorOne;
uniform vec3 uColorTWo;

uniform vec3 uColor;



vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main () {
  vec2 uv = gl_PointCoord;

  float xStretchFactor = uLength;
  float yStretchFactor = uThickness;

  uv = rotate(uv, PI * uRotation + uTime * uClockwise, vec2(0.5));

  // Animation
  // pulsating
  // xStretchFactor += xStretchFactor *  ((1. + sin(uTime * 16.)) *.5 );
  
  // scaling from 0
  xStretchFactor = xStretchFactor / ((1. + sin(uTime * uXFrequency)) *.5 );
  yStretchFactor += yStretchFactor * ((1. + cos(uTime * uYFrequency)) *.5 );

  // applying stetch factor to the uv
  // and then offseting it to the center  
  vec2 flareXUV = vec2(
    uv.x * xStretchFactor + (1. - xStretchFactor) / 2., 
    uv.y * yStretchFactor + (1. - yStretchFactor) / 2.
  );
  float lightX = 0.015 / distance(flareXUV, vec2(.5));

  // inverese x and y to get a vertical line
  vec2 flareYUV = vec2(
    uv.y * xStretchFactor + (1. - xStretchFactor) / 2., 
    uv.x * yStretchFactor + (1. - yStretchFactor) / 2.
  );
  float lightY = 0.015 / distance(flareYUV, vec2(.5));

  

  float strength = lightX * lightY;
  float alphaMask = strength;
  strength += (1. + sin(uTime)) * .5;


  vec3 color = vec3(0.);
  vec3 mixColor = vec3(strength) * uColorOne;

  color = mix(uColorTWo, mixColor, strength);
  color = mix(color, mixColor, strength);

  gl_FragColor = vec4(color, alphaMask);
}