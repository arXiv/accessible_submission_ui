// Get the privacy policy arrow and policy
const arrow = document.querySelector('.arrow');
const policy = document.querySelector('.policy-box');
const termsLink = document.querySelector('.terms-link');

// Hide the policy initially
policy.style.display = 'none';

// Add a click event listener to the arrow
arrow.addEventListener('click', function() {
  // Toggle the display of the policy
  if (policy.style.display === 'none') {
    policy.style.display = 'block';
  } else {
    policy.style.display = 'none';
  }
});

termsLink.addEventListener('click', (e) => {
    if (policy.style.display === 'none') {
        policy.style.display = 'block';
      } else {
        policy.style.display = 'none';
      }
});