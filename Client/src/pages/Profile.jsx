  import React, { useState, useEffect } from 'react';
  import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
  } from 'mdb-react-ui-kit';
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import Navar from '../Component/Navar';
  import Footer from '../Component/Footer';
  import axios from 'axios';
  import Usericon from '../Image/usericon.png';
  import {Link} from 'react-router-dom'

  export default function Profile() {
    const [modalOpen, setModalOpen] = useState(false);
    const [accountDetails, setAccountDetails] = useState({
      accountNo: '',
      ifscCode: '',
      accountHolderName: '',
      bankName: '' // Additional field for the bank name
    });
    const [user, setUser] = useState({});

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('UserToken'));
      axios
        .get('http://localhost:8081/user/vieww', { headers: { 'auth-token': token } })
        .then((res) => {
          console.log(res.data, 'datadata');
          setUser(res.data);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }, []);

    // Toggle the modal visibility
    const toggleModal = () => setModalOpen((prev) => !prev);

    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAccountDetails({ ...accountDetails, [name]: value });
    };

    // Handle form submission
    const handleSubmit = () => {
      console.log('Form submitted:', accountDetails);
      toggleModal(); // Close the modal after submission
    };

    // Check if account details are available
    const hasAccountDetails = user?.account_id && user.account_id.accountno;

    return (
      <div>
        <Navar />
        <section style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem active>User Details</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={
                        user?.account_id?.userimg
                          ? `http://localhost:8081/${user.account_id.userimg}`
                          : `${Usericon}`
                      }
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '200px', height: '200px' }}
                      fluid
                    />
                    <br />
                    <br />

                    {!hasAccountDetails && (
  <div className="d-flex justify-content-center">
  <Link to="/Editprofile" > <button type="button" className="btn btn-primary" >Edit</button></Link>

  </div>
)}

                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText style={{ color: 'darkslategray' }}>
                          Account No: {user?.account_id?.accountno}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                        <MDBCardText style={{ color: 'darkslategray' }}>
                          Aadharcard No: {user?.account_id?.aadharcardno}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText style={{ color: 'darkslategray' }}>
                          PanCard No: {user?.account_id?.pancardno}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText style={{ color: 'darkslategray' }}>
                          IFSC Code: {user?.account_id?.IFSC_code}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText style={{ color: 'darkslategray' }}>
                          MICR Code: {user?.account_id?.MICR_code}
                        </MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Age</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.account_id?.age}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.account_id?.address}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBCardText style={{ color: 'darkslategray' }}><b>Nominee Details:</b></MDBCardText>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.account_id?.nominee?.nominee_name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.account_id?.nominee?.nominee_email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.account_id?.nominee?.nominee_contactNumber}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Relationship</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user?.account_id?.nominee?.nominee_relationship}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        
<MDBModal show={modalOpen} setShow={setModalOpen}> {/* Correct usage of 'show' and 'setShow' */}
  <MDBModalDialog>
    <MDBModalContent>
      <MDBModalHeader>
        <h5 className="modal-title">Edit Bank Details</h5>
        <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
      </MDBModalHeader>
      <MDBModalBody>
        <form>
          <MDBInput
            label="Account No"
            value={accountDetails.accountNo}
            name="accountNo"
            onChange={handleInputChange}
          />
          <MDBInput
            label="IFSC Code"
            value={accountDetails.ifscCode}
            name="ifscCode"
            onChange={handleInputChange}
          />
          <MDBInput
            label="Account Holder Name"
            value={accountDetails.accountHolderName}
            name="accountHolderName"
            onChange={handleInputChange}
          />
          <MDBInput
            label="Bank Name"
            value={accountDetails.bankName}
            name="bankName"
            onChange={handleInputChange}
          />
        </form>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggleModal}>Close</MDBBtn>
        <MDBBtn color="primary" onClick={handleSubmit}>Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

        <Footer />
      </div>
    );
  }
