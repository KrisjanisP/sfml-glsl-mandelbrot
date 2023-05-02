#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>

int main()
{
    sf::RenderWindow window(sf::VideoMode(640, 480), "SFML fragment shader example");
    sf::Sprite sprite;
    sf::Texture texture;
    texture.create(window.getSize().x, window.getSize().y);
    sprite.setTexture(texture);
    
    sf::Shader shader;
    if (!shader.loadFromFile("mandelbrot.frag", sf::Shader::Fragment))
    {
        std::cout << "Error loading shader" << std::endl;
        return 1;
    }

    // set the shader parameters
    shader.setUniform("texture", sf::Shader::CurrentTexture);
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }
        window.clear();
        window.draw(sprite, &shader);
        window.display();
    }

    return 0;
}
