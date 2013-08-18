tilefx
======

v0.1
----

This jQuery plugin can be used to animate images in various ways
by sub-dividing them into smaller pixels. For examples, take a
look at (http://simonwo.net/code/tilefx).

Performance will vary browser to browser. Decreasing the tile
size (and hence increasing the number of tiles) and increasing
the speed will make things slower. Test thoroughly on all your
target browsers as there is still much variation in the speed
of operation across the major JS engines.

Use these effects at your own risk. [You can totally destory any
power a design has by adding animation.](bit.ly/17WmHpE) In short,
animation should be subtle, and shouldn't distract the user from
the purpose of their visit.

Usage
-----

* **init** (options):

  `$('img').tilefx('init', {tilewidth: 10, tileheight: 10})`

  Converts img elements into an array of div elements that tilefx
  will use for animation. The conversion is automatic and nothing
  will appear to have changed until an effect is applied.

  options:
  * tilewidth: the pixel width of each tile (default: 10)
  * tileheight: the pixel height of each tile (default: 10)
  * targets: an array of image URLs to animate between

* **retarget** (targets):

  `$(elem).tilefx('retarget', ['myimage1.jpg, myimage2.png'])`

  Changes the images that tilefx will cycle through.

  targets: an array of image URLs to animate between

* **scramble** ():

  `$(elem).tilefx('scramble')`

  Changes image by randomly picking tiles to fade in and out.

* **single** (number=1):

  `$(elem).tilefx('single', 5)`

  Change 1 or more of an image's tiles.

  number: the number of tiles to animate.

* **wipe** (speed=100):

  `$(elem).tilefx('wipe', 250)`

  Aniamte columns of tiles from left to right with a delay
  between each column.

  speed: the number of msec to wait between each column.