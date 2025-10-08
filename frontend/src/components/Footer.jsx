import React from 'react'

function Footer() {
  return (
<div class="footer" id="contact">
  <div class="row">
    {/* <!-- Column 1: Logo & Description --> */}
    <div className="col">
      <h1 className='font-bold text-5xl'>HOR<span className='text-purple-400'>YAAL</span></h1>
      <p  className='text-white'>
        Welcome to Horyaal Hotel! Enjoy luxury, comfort, and excellent services. 
        Your perfect getaway starts here, where elegance meets relaxation.
      </p>
    </div>

    {/* <!-- Column 2: Office Info --> */}
    <div class="col text-white">
      <h3>Office <div class="underline"><span></span></div></h3>
      <p className='text-white'>Talex Road</p>
      <p  className='text-white'>Mogadishu, Somalia</p>
      <p  className='text-white'>D. Xamar Jajab</p>
      <p class="email-id">horyaalhotel@gmail.com</p>
      <h4>+252 613915805</h4>
    </div>

    {/* <!-- Column 3: Links --> */}
    <div class="col">
      <h3>Links <div class="underline"><span></span></div></h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    {/* <!-- Column 4: Newsletter & Social Media --> */}
    <div class="col">
      <h3>Newsletter <div class="underline"><span></span></div></h3>
      <form>
        <i class="far fa-envelope"></i>
        <input type="email" placeholder="Enter your email" required/>
        <button type="submit"><i class="fas fa-arrow-right"></i></button>
      </form>

      {/* <!-- Social Media Icons --> */}
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://wa.me/252613915805" target="_blank">
          <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://www.tiktok.com/@hodanshein?lang=en" target="_blank">
          <i class="fab fa-tiktok"></i>
        </a>
      </div>
    </div>
  </div>

  <hr/>
  <p class="copyright">
    © 2025 Horyaal Hotel. All Rights Reserved.
  </p>
</div>

  )
}

export default Footer;
