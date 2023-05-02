#version 330 core

in vec2 v_texCoord;
out vec4 color;

int iterations(float x, float y, int limit=20)
{
    float cx = x, cy = y;
    float zx = 0, zy = 0;
    float zx2 = 0, zy2 = 0;
    for(int i=0;i<limit;i++)
    {
        zy = (2*zx*zy)+cy;
        zx = zx2-zy2+cx;
        zx2 = zx*zx;
        zy2 = zy*zy;
        if((zx2+zy2)>4) return i;
    }
    return limit;
}


void main()
{

    vec2 pixelCoord = vec2(gl_FragCoord.x, gl_FragCoord.y);
    ivec2 tileCoords = ivec2(floor(v_texCoord * 8.0)); // determine which tile the fragment is in

    bool isDark = iterations(gl_FragCoord.x, gl_FragCoord.y); // determine whether the tile is dark or light

    if (isDark)
    {
        color = vec4(0.0, 0.0, 0.0, 1.0); // dark color
    }
    else
    {
        color = vec4(1.0, 1.0, 1.0, 1.0); // light color
    }
}