import React, { useEffect, useState } from 'react';
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
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';



export default function SingleView() {
  const host = "http://localhost:8081";
  const { id } = useParams();
  const [data, setData] = useState(null); // Changed to `null` to handle initial state better
  const [error, setError] = useState(null); // State for handling errors
  const [count, setCount] = useState(false)
  useEffect(() => {
    axios.get(`${host}/account/singleView/${id}`)
      .then((res) => {
        console.log(res.data.data, "response1111");
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch account data. Please try again later.");
      });
  }, [id,count]);



  // Fallback for when data is not loaded yet
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const hendleAccept = (id) => {
    console.log("Accept: ", id);
    setCount(true);
    const action = { action: "Accept" };
    axios.put(`${host}/user/userupdate/${id}`, action)
        .then((res) => {
            if (res.data) {
                console.log(res.data, 'response');
                // setOpen(true);
                // setTimeout(async () => {
                //     await navigate('/admin/mrequest');
                // }, 1000);
                setCount(false);
            } else {
                console.log("Some error occurred");
                setCount(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setCount(false);
        });
};

const hendleReject = (id) => {
  console.log("Reject: ", id);
  setCount(true);
  const action = { action: "Reject" };
  axios.put(`${host}/user/userupdate/${id}`, action)
      .then((res) => {
          if (res.data) {
              console.log(res.data, 'response');
              // setOpen(true);
              // setTimeout(async () => {
              //     await navigate('/admin/mrequest');
              // }, 1000);
              setCount(false);
          } else {
              console.log("Some error occurred");
              setCount(false);
          }
      })
      .catch((err) => {
          console.log(err);
          setCount(false);
      });
};

  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem active>Account Details</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={`http://localhost:8081/${data?.userimg}`}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', marginBottom: '5px' }}
                    fluid
                  />
                  <div className="d-flex justify-content-center">
                    <MDBBtn>{data?.OpBalance}</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                      <MDBCardText style={{ color: 'darkslategray' }}>Account No: {data?.accountno}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                      <MDBCardText style={{ color: 'darkslategray' }}>Aadharcard No: {data?.aadharcardno}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                      <MDBCardText style={{ color: 'darkslategray' }}>PanCard No: {data?.pancardno}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                      <MDBCardText style={{ color: 'darkslategray' }}>IFSC Code: {data?.IFSC_code}</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                      <MDBCardText style={{ color: 'darkslategray' }}>MICR Code: {data?.MICR_code}</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              {/* Buttons Section - Left side of Account Details */}
              <MDBRow className="mb-4">
              <MDBCol className="d-flex justify-content-start">
  {/* Render buttons based on status */}
  {data?.Status === "notApproved" && (
    <>
      <MDBBtn color="success" size="lg" onClick={() => hendleAccept(data?._id)}>Accept</MDBBtn>
      <MDBBtn color="danger" size="lg" onClick={() => hendleReject(data?._id)}>Reject</MDBBtn>
    </>
  )}
  
  {/* Render Rejected button if status is "Rejected" */}
  {data?.Status === "Rejected" && (
    <MDBBtn color="danger" size="lg" disabled>
      Rejected
    </MDBBtn>
  )}
</MDBCol>

</MDBRow>



              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.age}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.address}</MDBCardText>
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
                      <MDBCardText className="text-muted">{data?.nominee?.nominee_name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.nominee?.nominee_email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.nominee?.nominee_contactNumber}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Relationship</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.nominee?.nominee_relationship}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data?.nominee?.nominee_address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
