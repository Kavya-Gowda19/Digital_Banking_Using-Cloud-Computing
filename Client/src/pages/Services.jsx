import React from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div>
      
      <div class="breadcrumb-option set-bg" data-setbg="img/breadcrumb/breadcrumb-bg.jpg">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Main Loan Services</h2>
                        <div class="breadcrumb__links">
                            <Link to={'/'}>Home</Link>
                            {/* <a href="">Features</a> */}
                            <span>Services</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Services/>

    </div>
  )
}
