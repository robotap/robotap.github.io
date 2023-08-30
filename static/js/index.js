window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {

    set_source(0);
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
        //var success_text = [
        //    "Stack 4 wooden objects on top of each other.",
        //    "Place the apple on the jello.",
        //    "Insert the 4 wooden objects into their sockets.",
        //    "Apply glue to a wooden block, push them together with another wooden block, and place them to the right of the white gear.",
        //    "Place the green juggling ball on top of the blue juggling ball.",
        //    "Attach the orange brick across the blue brick.",
        //    "Pick up the butter and place it in the hand.",
        //    "Pick up the tapir toy and bring it over to the side of the wooden robot.",
        //];
    	//document.querySelector('#success-text').innerHTML=success_text[0];
        //if (carousels[i].element.id=='results-carousel') {
        //  // Add listener to  event
        //  carousels[i].on('after:show', state => {
        //    console.log(state)
    	//	document.querySelector('#success-text').innerHTML=success_text[state.next%8];
        //  });
        //}
        var failure_text = [
            "The 4 object stack fails as the compounded errors cause the final object to be placed in an unstable position. This happens as the controller isn't precise enough and it doesn't have the ability to reason about the dynamics of the scene.",
            "As the second object is about to be placed, the important points on the pink object get occluded by the gripper. As the arm moves up, the object gets progressively smaller causing the controller to diverge as it looses tracking due to the scale change. This could be remedied by using more cameras.",
            "The apple can be picked up despite the occlusions from the sticker. As the apple it about to be placed down however, the sticker occludes the top of the jello box which is required to be seen from the camera for the placement. This could also be remedied by using more cameras.",
            "Almost all of the motion is performed correctly, but in the last step, as the controllers tries to place the block besides the white gear, it collides with the juggling ball. Because there is no pathway to reason about clutter, the controllers ends up letting go of the object.",
            "As the orange block gets placed on top of the blue one, it doesn't get placed sufficiently precisely. Therefore, when it gets pushed down, it slides to the side instead of clicking in. This could be addressed with a more precise controller or a controller which could reason about the required forces.",
            "Even though the overall motion is executed correctly, the objects did not get placed accurately enough for them to be inserted into the holes. This could be because it composed 2 demonstrations where the objects were grasped differently.",
        ];
        if (carousels[i].element.id=='failure-carousel') {
          carousels[i].on('after:show', state => {
    		document.querySelector('#failure-text').innerHTML=failure_text[(state.next + 6)%6];
          });
        }
    }
    document.querySelector('#failure-text').innerHTML=failure_text[0];

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    //$('#interpolation-slider').on('input', function(event) {
    //  setInterpolationImage(this.value);
    //});
    //setInterpolationImage(0);
    //$('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    //bulmaSlider.attach();


})

function set_source(idx){
  data=[
    [
        "The task is to <b>glue the 2 blocks together</b>. The robot has to apply glue to a wooden block, place another wooden block on top, push them together, and place them to the right of the white gear. Masking tape, tapir, balls, apple, and sticky note were not present in the demos.",
        "gluing_11.mp4",
        "gluing_15.mp4",
        "gluing_17.mp4",
    ],
    [
        "The task is to <b>pick up the the apple and place it on the jello</b>. Only the apple and jello were present in the demos.  RoboTAP works even if there are other red objects on the scene, the goal is partially occluded or when the scene is full of distracting objects.",
        "apple_on_jello_1.mp4",
        "apple_on_jello_10.mp4",
        "apple_on_jello_14.mp4",
    ],
    [
        "The task is to <b>pick up the green juggling ball and place it on the blue one</b>. RoboTAP succeeds, despite both of these juggling balls being mostly textureless, deformable and symmetric. We can also place the objects on top of of jello or tomato without the need to modify RoboTAP.  Only the juggling balls were present in the demos.",
        "juggling_stack_20.mp4",
        "juggling_stack_25.mp4",
        "juggling_stack_29.mp4",
    ],
    [
        "The task is to <b>insert the 4 wooden objects</b> into their sockets. This is a long horizon task which involves textureless and symmetric objects and requires precise placement. RoboTAP can generalize to novel starting positions.  Only the stencil and the four objects were present in the demos.",
        "four_block_stencil_w2_39.mp4",
        "four_block_stencil_w2_47.mp4",
        "four_block_stencil_w2_49.mp4",
    ],
    [
        "The task is to <b>attach the orange brick across the blue brick</b>. RoboTAP can correctly identify the objects even when partially occluded.  Only legos were present in the demos.",
        "lego_stack_w3_2.mp4",
        "lego_stack_w3_11.mp4",
        "lego_stack_w3_12.mp4",
    ],
    [
        "The task is to <b>pick up the tapir toy and bring it over to the side of the wooden robot</b>. Only the tapir and the robot were present in the demos.  Thanks to TAPIR's ability to track points RoboTAP can correctly identify the robot even when other objects with a very similar texture are in the scene.",
        "tapir_robot_v2_4.mp4",
        "tapir_robot_v2_14.mp4",
        "tapir_robot_v2_16.mp4",
    ],
    [
        "The task is to <b>stack 4 wooden objects</b> on top of each other. This task is particularly challanging, because any errors in placement compound and can make the final tower fall over.  Clutter was not evaluated thoroughly, as we found that occasional false-positives from TAPIR slightly reduced the consistency of grasps and placements, which tended to accumulate and resulted in unsuccessful stacks.",
        "four_block_stack_1.mp4",
        "four_block_stack_3.mp4",
        "four_block_stack_8.mp4",
    ],
    [
        "The task is to <b>pick up the butter and place it in the hand</b>. Since RoboTAP works by aligning arbitrary points, we created a task where the location of the hand is important. We did not use any specific hand tracking solution.  Only the hand and the butter were present in the demos.",
        "pass_butter_1.mp4",
        "pass_butter_20.mp4",
        "pass_butter_22.mp4",
    ],
    [
        "The task is to <b>pick up the gear and place it on the grid</b>. This task was primarily used to evaluate the precision of the placement. In these videos we can see the 3 evaluation settings further described in the paper.",
        "precision_1.mp4",
        "precision_11.mp4",
        "precision_12.mp4",
    ],

  ]
  document.getElementById("text").innerHTML=data[idx][0];
  for (var i = 0; i<3; ++i){
    vid=document.getElementById("success_vid"+i);
    vid.getElementsByTagName('source')[0].src=("https://storage.googleapis.com/dm-tapnet/robotap/videos/success_gallery/"+data[idx][i+1]);
    vid.load();
  }
  /* Scroll to the top of visible videos. Important on phone. */
  const visibility_margin = 30
  var gallery_table_element = document.getElementById('gallery_table')
  if (gallery_table_element.getBoundingClientRect().top < visibility_margin) {
    const y = gallery_table_element.getBoundingClientRect().top + window.pageYOffset - visibility_margin;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
}

