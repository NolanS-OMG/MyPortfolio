let navBar = document.getElementById('nav-bar');
let navBarWave = document.getElementById('nav-bar-wave');
let AboutMeBox = document.getElementById('about-me');

let educationBox = document.getElementById('education');
let skillsBox = document.getElementById('skills');

const ANIMATION_DURATION = 1999; //Same as de css animation-duration

const NAVBAR_HEIGHT = navBar.getBoundingClientRect().height + navBarWave.getBoundingClientRect().height;

const OutAnimation = () => {
  let topPixels = AboutMeBox.getBoundingClientRect().top;

  if (topPixels < NAVBAR_HEIGHT+20) {
    educationBox.style.animationName = 'education-out-animation';
    skillsBox.style.animationName = 'skills-out-animation';
    setTimeout(() => {
      educationBox.style.left = '-100%';
      skillsBox.style.left = '100%';
      document.removeEventListener('scroll', OutAnimation);
    }, ANIMATION_DURATION);
  }

}

document.addEventListener('scroll', OutAnimation);