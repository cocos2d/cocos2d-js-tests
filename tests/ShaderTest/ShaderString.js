/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var EXAMPLE_BLUR_FRAG =
    "#ifdef GL_ES                            \n"
        + "precision mediump float;          \n"
        + "#endif                            \n"
        + "                                  \n"
        + "varying vec4 v_fragmentColor;     \n"
        + "varying vec2 v_texCoord;          \n"
        + "                                  \n"
        + "uniform sampler2D CC_Texture0;      \n"
        + "                                  \n"
        + "uniform vec2 blurSize;            \n"
        + "uniform vec4 substract;           \n"
        + "                                  \n"
        + "void main() {                      \n"
        + "     vec4 sum = vec4(0.0);              \n"
        + "     sum += texture2D(u_texture, v_texCoord - 4.0 * blurSize) * 0.05;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord - 3.0 * blurSize) * 0.09;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord - 2.0 * blurSize) * 0.12;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord - 1.0 * blurSize) * 0.15;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord                 ) * 0.16;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord + 1.0 * blurSize) * 0.15;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord + 2.0 * blurSize) * 0.12;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord + 3.0 * blurSize) * 0.09;                      \n"
        + "     sum += texture2D(u_texture, v_texCoord + 4.0 * blurSize) * 0.05;                      \n"
        + "                                                                                           \n"
        + "     gl_FragColor = (sum - substract) * v_fragmentColor;                                   \n"
        + "}                                                                                          \n";

//------------------------------example_flower shader string-----------------------------------------
// Shader from http://www.iquilezles.org/apps/shadertoy/
var EXAMPLE_FLOWER_FRAG =
    "#ifdef GL_ES                                   \n"
        + "precision highp float;                   \n"
        + "#endif                                   \n"
        + "                                         \n"
        + "uniform vec2 center;                     \n"
        + "uniform vec2 resolution;                 \n"
        + "uniform float time;                      \n"
        + "                                         \n"
        + "//float u( float x ) { return 0.5+0.5*sign(x); }     \n"
        + "float u( float x ) { return (x>0.0)?1.0:0.0; }       \n"
        + "//float u( float x ) { return abs(x)/x; }            \n"
        + "                                                     \n"
        + "void main(void)                                      \n"
        + "{                                                    \n"
        + "vec2 p = 2.0 * (gl_FragCoord.xy - center.xy) / resolution.xy; \n"
        + "                                         \n"
        + "float a = atan(p.x,p.y);                 \n"
        + "float r = length(p)*.75;                 \n"
        + "                                         \n"
        + "float w = cos(3.1415927*time-r*2.0);                                 \n"
        + "float h = 0.5+0.5*cos(12.0*a-w*7.0+r*8.0);                           \n"
        + "float d = 0.25+0.75*pow(h,1.0*r)*(0.7+0.3*w);                        \n"
        + "                                                                     \n"
        + "float col = u( d-r ) * sqrt(1.0-r/d)*r*2.5;                          \n"
        + "col *= 1.25+0.25*cos((12.0*a-w*7.0+r*8.0)/2.0);                      \n"
        + "col *= 1.0 - 0.35*(0.5+0.5*sin(r*30.0))*(0.5+0.5*cos(12.0*a-w*7.0+r*8.0));            \n"
        + "gl_FragColor = vec4(                                                 \n"
        + "    col,                                                             \n"
        + "    col-h*0.5+r*.2 + 0.35*h*(1.0-r),                                 \n"
        + "    col-h*r + 0.1*h*(1.0-r),                                         \n"
        + "    1.0);                                                            \n"
        + "}                                                                    \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_FLOWER_VERT =
    "attribute vec4 a_position;                 \n"
        + "                                     \n"
        + "void main()                          \n"
        + "{                                    \n"
        + "     gl_Position = CC_MVPMatrix * a_position; \n"
        + "}                                   \n";

//------------------------------example_heart shader string-----------------------------------------
// Shader from http://www.iquilezles.org/apps/shadertoy/
var EXAMPLE_HEART_FRAG =
    "#ifdef GL_ES                                \n"
        + "precision highp float;                \n"
        + "#endif                                \n"
        + "                                       \n"
        + "uniform vec2 center;                   \n"
        + "uniform vec2 resolution;               \n"
        + "uniform float time;                    \n"
        + "                                       \n"
        + "void main(void)                        \n"
        + "{                                      \n"
        + "vec2 p = 2.0 * (gl_FragCoord.xy - center.xy) / resolution.xy;                 \n"
        + "// animate                                                                    \n"
        + "float tt = mod(time,2.0)/2.0;                                                 \n"
        + "float ss = pow(tt,.2)*0.5 + 0.5;                                              \n"
        + "    ss -= ss*0.2*sin(tt*6.2831*5.0)*exp(-tt*6.0);                             \n"
        + "    p *= vec2(0.5,1.5) + ss*vec2(0.5,-0.5);                                   \n"
        + "                                                                              \n"
        + "    float a = atan(p.x,p.y)/3.141593;                                         \n"
        + "    float r = length(p);                                                      \n"
        + "                                                                              \n"
        + "    // shape                                                                  \n"
        + "    float h = abs(a);                                                         \n"
        + "    float d = (13.0*h - 22.0*h*h + 10.0*h*h*h)/(6.0-5.0*h);                   \n"
        + "                                                                              \n"
        + "    // color                                                                  \n"
        + "    float f = step(r,d) * pow(1.0-r/d,0.25);                                  \n"
        + "                                                                              \n"
        + "    gl_FragColor = vec4(f,0.0,0.0,1.0);                                       \n"
        + "}                                                                             \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_HEART_VERT =
    "attribute vec4 a_position;                               \n"
        + "                                                   \n"
        + "void main()                                        \n"
        + "{                                                  \n"
        + "    gl_Position = CC_MVPMatrix * a_position;        \n"
        + "}                                                  \n";

//TODO need fix
var EXAMPLE_HORIZONTALCOLOR_FRAG =
    "#ifdef GL_ES                                               \n"
        + "precision lowp float;                                \n"
        + "#endif                                               \n"
        + "                                                     \n"
        + "varying vec2 v_texCoord;                             \n"
        + "uniform sampler2D CC_Texture0;                       \n"
        + "                                                     \n"
        + "vec4 colors[10];                                     \n"
        + "vec4 selColor;                                                     \n"
        + "void main(void)                                      \n"
        + "{                                                    \n"
        + "    colors[0] = vec4(1,0,0,1);                       \n"
        + "    colors[1] = vec4(0,1,0,1);                       \n"
        + "    colors[2] = vec4(0,0,1,1);                       \n"
        + "    colors[3] = vec4(0,1,1,1);                       \n"
        + "    colors[4] = vec4(1,0,1,1);                       \n"
        + "    colors[5] = vec4(1,1,0,1);                       \n"
        + "    colors[6] = vec4(1,1,1,1);                       \n"
        + "    colors[7] = vec4(1,0.5,0,1);                     \n"
        + "    colors[8] = vec4(1,0.5,0.5,1);                   \n"
        + "    colors[9] = vec4(0.5,0.5,1,1);                   \n"
        + "                                                     \n"
        + "    // inline to prevent 'float' loss and keep using lowp               \n"
        + "    int y = int( mod(gl_FragCoord.y , 10.0 ) );                    \n"
        + "    selColor = vec4(mod(gl_FragCoord.y , 10.0 )/10.0,mod(gl_FragCoord.y , 10.0 )/10.0,1,1);                            \n"
        + "    for(int i=0; i< 10;i++){                          \n"
        + "         if(i < y){                                 \n"
        + "             selColor = colors[i];                   \n"
        + "             break;                                  \n"
        + "         }                                           \n"
        + "    selColor = colors[i];}                                                \n"
        + "    //gl_FragColor = colors[y] * texture2D(CC_Texture0, v_texCoord);      \n"
        + "    gl_FragColor = selColor * texture2D(CC_Texture0, v_texCoord);      \n"
        + "}                                                     \n";

//------------------------------example_julia shader string-----------------------------------------
// Shader from http://www.iquilezles.org/apps/shadertoy/
var EXAMPLE_JULIA_FRAG =
    "#ifdef GL_ES                                                \n"
        + "precision highp float;                                \n"
        + "#endif                                                \n"
        + "                                                      \n"
        + "uniform vec2 center;                                  \n"
        + "uniform vec2 resolution;                              \n"
        + "uniform float time;                                   \n"
        + "                                                      \n"
        + "void main(void)                                       \n"
        + "{                                                     \n"
        + "    vec2 p = 2.0 * (gl_FragCoord.xy - center.xy) / resolution.xy;                            \n"
        + "    vec2 cc = vec2( cos(.25*time), sin(.25*time*1.423) );                                    \n"
        + "                                                                                             \n"
        + "    float dmin = 1000.0;                                                                     \n"
        + "   vec2 z  = p*vec2(1.33,1.0);                                                               \n"
        + "    for( int i=0; i<64; i++ )                                                                \n"
        + "    {                                                                                        \n"
        + "        z = cc + vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y );                                     \n"
        + "        float m2 = dot(z,z);                                                                 \n"
        + "        if( m2>100.0 ) break;                                                                \n"
        + "        dmin=min(dmin,m2);                                                                   \n"
        + "    }                                                                                        \n"
        + "                                                                                             \n"
        + "    float color = sqrt(sqrt(dmin))*0.7;                                                      \n"
        + "    gl_FragColor = vec4(color,color,color,1.0);                                              \n"
        + "}                                                                                            \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_JULIA_VERT =
    "attribute vec4 a_position;                               \n"
        + "                                                   \n"
        + "void main()                                        \n"
        + "{                                                  \n"
        + "    gl_Position = CC_MVPMatrix * a_position;       \n"
        + "}                                                  \n";


//------------------------------example_mandelbrot shader string-----------------------------------------
// Shader from http://www.iquilezles.org/apps/shadertoy/
var EXAMPLE_MANDELBROT_FRAG =
    "#ifdef GL_ES                                                \n"
        + "precision highp float;                                \n"
        + "#endif                                                \n"
        + "                                                      \n"
        + "uniform vec2 center;                                  \n"
        + "uniform vec2 resolution;                              \n"
        + "uniform float time;                                   \n"
        + "                                                      \n"
        + "void main(void)                                       \n"
        + "{                                                     \n"
        + "    vec2 p = 2.0 * (gl_FragCoord.xy - center.xy) / resolution.xy;                         \n"
        + "    p.x *= resolution.x/resolution.y;                                                     \n"
        + "                                                                                          \n"
        + "    float zoo = .62+.38*sin(.1*time);                                                     \n"
        + "    float coa = cos( 0.1*(1.0-zoo)*time );                                                \n"
        + "    float sia = sin( 0.1*(1.0-zoo)*time );                                                \n"
        + "    zoo = pow( zoo,8.0);                                                                  \n"
        + "    vec2 xy = vec2( p.x*coa-p.y*sia, p.x*sia+p.y*coa);                                    \n"
        + "    vec2 cc = vec2(-.745,.186) + xy*zoo;                                                  \n"
        + "                                                                                          \n"
        + "    vec2 z  = vec2(0.0);                                                                  \n"
        + "    vec2 z2 = z*z;                                                                        \n"
        + "    float m2;                                                                             \n"
        + "    float co = 0.0;                                                                       \n"
        + "                                                                                          \n"
        + "    for( int i=0; i<256; i++ )                                                            \n"
        + "    {                                                                                     \n"
        + "        z = cc + vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y );                                  \n"
        + "        m2 = dot(z,z);                                                                    \n"
        + "        if( m2>1024.0 ) break;                                                            \n"
        + "        co += 1.0;                                                                        \n"
        + "    }                                                                                     \n"
        + "    co = co + 1.0 - log2(.5*log2(m2));                                                    \n"
        + "                                                                                          \n"
        + "    co = sqrt(co/256.0);                                                                  \n"
        + "    gl_FragColor = vec4( .5+.5*cos(6.2831*co+0.0),                                        \n"
        + "        .5+.5*cos(6.2831*co+0.4),                                                         \n"
        + "        .5+.5*cos(6.2831*co+0.7),                                                         \n"
        + "        1.0 );                                                                            \n"
        + "}                                                                                         \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_MANDELBROT_VERT =
    "attribute vec4 a_position;                               \n"
        + "                                                   \n"
        + "void main()                                        \n"
        + "{                                                  \n"
        + "    gl_Position = CC_MVPMatrix * a_position;       \n"
        + "}                                                  \n";

//------------------------------example_monjori shader string-----------------------------------------
// Shader from http://www.iquilezles.org/apps/shadertoy/
var EXAMPLE_MONJORI_FRAG =
    "#ifdef GL_ES                                                \n"
        + "precision highp float;                                \n"
        + "#endif                                                \n"
        + "                                                      \n"
        + "uniform vec2 center;                                  \n"
        + "uniform vec2 resolution;                              \n"
        + "uniform float time;                                   \n"
        + "                                                      \n"
        + "void main(void)                                       \n"
        + "{                                                     \n"
        + "    vec2 p = 2.0 * (gl_FragCoord.xy - center.xy) / resolution.xy;                       \n"
        + "    float a = time*40.0;                                                          \n"
        + "    float d,e,f,g=1.0/40.0,h,i,r,q;                                                     \n"
        + "    e=400.0*(p.x*0.5+0.5);                                                              \n"
        + "    f=400.0*(p.y*0.5+0.5);                                                              \n"
        + "    i=200.0+sin(e*g+a/150.0)*20.0;                                                      \n"
        + "    d=200.0+cos(f*g/2.0)*18.0+cos(e*g)*7.0;                                             \n"
        + "    r=sqrt(pow(i-e,2.0)+pow(d-f,2.0));                                                  \n"
        + "    q=f/r;                                                                              \n"
        + "    e=(r*cos(q))-a/2.0;f=(r*sin(q))-a/2.0;                                              \n"
        + "    d=sin(e*g)*176.0+sin(e*g)*164.0+r;                                                  \n"
        + "    h=((f+d)+a/2.0)*g;                                                                  \n"
        + "    i=cos(h+r*p.x/1.3)*(e+e+a)+cos(q*g*6.0)*(r+h/3.0);                                  \n"
        + "    h=sin(f*g)*144.0-sin(e*g)*212.0*p.x;                                                \n"
        + "    h=(h+(f-e)*q+sin(r-(a+h)/7.0)*10.0+i/4.0)*g;                                        \n"
        + "    i+=cos(h*2.3*sin(a/350.0-q))*184.0*sin(q-(r*4.3+a/12.0)*g)+tan(r*g+h)*184.0*cos(r*g+h);         \n"
        + "    i=mod(i/5.6,256.0)/64.0;                                                                        \n"
        + "    if(i<0.0) i+=4.0;                                                                               \n"
        + "    if(i>=2.0) i=4.0-i;                                                                             \n"
        + "    d=r/350.0;                                                                                      \n"
        + "    d+=sin(d*d*8.0)*0.52;                                                                           \n"
        + "    f=(sin(a*g)+1.0)/2.0;                                                                           \n"
        + "    gl_FragColor=vec4(vec3(f*i/1.6,i/2.0+d/13.0,i)*d*p.x+vec3(i/1.3+d/8.0,i/2.0+d/18.0,i)*d*(1.0-p.x),1.0);   \n"
        + "}                                                  \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_MONJORI_VERT =
    "attribute vec4 a_position;                               \n"
        + "                                                   \n"
        + "void main()                                        \n"
        + "{                                                  \n"
        + "    gl_Position = CC_MVPMatrix * a_position;       \n"
        + "}                                                  \n";

//------------------------------example_plasma shader string-----------------------------------------
// Shader from http://www.iquilezles.org/apps/shadertoy/
var EXAMPLE_PLASMA_FRAG =
    "#ifdef GL_ES                                             \n"
        + "precision highp float;                             \n"
        + "#endif                                             \n"
        + "                                                   \n"
        + "uniform vec2 center;                               \n"
        + "uniform vec2 resolution;                           \n"
        + "uniform float time;                                \n"
        + "                                                   \n"
        + "void main(void)                                    \n"
        + "{                                                  \n"
        + "    float x = gl_FragCoord.x - (center.x - resolution.x / 2.0);                            \n"
        + "    float y = gl_FragCoord.y - (center.y - resolution.y / 2.0);                            \n"
        + "    float mov0 = x+y+cos(sin(time)*2.)*100.+sin(x/100.)*1000.;                             \n"
        + "    float mov1 = y / resolution.y / 0.2 + time;                                            \n"
        + "    float mov2 = x / resolution.x / 0.2;                                                   \n"
        + "    float c1 = abs(sin(mov1+time)/2.+mov2/2.-mov1-mov2+time);                              \n"
        + "    float c2 = abs(sin(c1+sin(mov0/1000.+time)+sin(y/40.+time)+sin((x+y)/100.)*3.));       \n"
        + "    float c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(x/1000.)));                      \n"
        + "    gl_FragColor = vec4( c1,c2,c3,1.0);                                                    \n"
        + "}                                                                                          \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_PLASMA_VERT =
    "attribute vec4 a_position;                               \n"
        + "                                                   \n"
        + "void main()                                        \n"
        + "{                                                  \n"
        + "    gl_Position = CC_MVPMatrix * a_position;       \n"
        + "}                                                  \n";


//------------------------------example_Twist shader string-----------------------------------------
// Shader from here: http://www.iquilezles.org/
var EXAMPLE_TWIST_FRAG =
    "#ifdef GL_ES                                                 \n"
        + "precision highp float;                                     \n"
        + "#endif                                                     \n"
        + "                                                           \n"
        + "uniform vec2 resolution;                                   \n"
        + "uniform sampler2D tex0;                                    \n"
        + "uniform sampler2D tex1;                                    \n"
        + "                                                           \n"
        + "void main(void)                                            \n"
        + "{                                                          \n"
        + "    float time = CC_Time[1];                               \n"
        + "    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;  \n"
        + "    vec2 uv;                                               \n"
        + "                                                           \n"
        + "    float a = atan(p.y,p.x);                               \n"
        + "    float r = sqrt(dot(p,p));                              \n"
        + "                                                           \n"
        + "    uv.x = r - CC_Time[2];                                 \n"
        + "    uv.y = sin(a*10.0 + 2.0*CC_CosTime[0];                 \n"
        + "                                                           \n"
        + "    vec3 col =  (.5+.5*uv.y)*texture2D(tex0,uv).xyz;       \n"
        + "                                                           \n"
        + " gl_FragColor = vec4(col,1.0);                             \n"
        + "}                                                          \n";

// http://www.cocos2d-iphone.org
var EXAMPLE_TWIST_VERT =
    "attribute vec4 a_position;                               \n"
        + "                                                   \n"
        + "void main()                                        \n"
        + "{                                                  \n"
        + "    gl_Position = CC_MVPMatrix * a_position;       \n"
        + "}                                                  \n";
