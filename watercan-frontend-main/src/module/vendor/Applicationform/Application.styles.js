import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  // flex-direction: row;
  height: 100vh;
  width: 100%;
  background-color:rgb(159, 211, 235);

`;

export const ContentContainer = styled.div`
  flex: 1;
  width: 40%;


.container {
  position: relative;
  display: inline-block; /* Adjust width based on content */
  width: 100%; /* Adjust as needed */
}

.logo {
width: 100%;
height: 100vh;
  display: block;
}

.overlay-text {
  position: absolute;
  top: 15%; /* Adjust vertical position */
  left: 50%; /* Adjust horizontal position */
  transform: translate(-50%, -50%); /* Centering */
  text-align: center;
  color: white; /* Ensure text is visible */
  background: rgba(0, 0, 0, 0.5); /* Optional: Add a dark overlay for readability */
  padding: 10px;
  border-radius: 8px;
  }

.heading, .subheading, .description {
  margin: 5px 0;
}

@media (max-width: 1170px) {
  width: 50%;
}

@media (max-width: 768px) {
  display: none;
}

`;

export const FormContainer = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Arial, sans-serif;
  justify-content: center;
  background-color:rgb(159, 211, 235);

  @media (max-width: 1360px) {
    width: 40%;
    padding: 20px;
}


  @media (max-width: 768px) {
    width: 100%;
    background-color:rgb(159, 211, 235);
  }

`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #333;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 1300px) {
    margin-bottom: 30px;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;

  .ant-select-single {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;

    @media (max-width: 1300px) {
      height: 30px;
    }
  }

  .ant-select-multiple {
    font-size: 12px;
}

.ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
  font-size: 0.7rem;
  padding: 10px;
  }

.ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
  border: none;
  background: none;
       background-color: #fff;
           padding: 8px;
  }

 .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
 padding: 0px;
 }

  .form-row{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 1300px) {
    gap: 20px;
  }

  .form-row-two{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .form-row-time{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 1170px) {
      grid-template-columns: 1fr;
    }
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        
      }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .upload-button{
        display: inline-block;
        padding: 8px 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        background: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        color: #ccc;

        @media (max-width: 1300px) {
          font-size: 0.7rem;
          padding: 8px;
        }
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

    &::placeholder {
    color: #ccc;
    font-weight:300;
  }

  @media (max-width: 1300px) {
  font-size: 0.7rem;
  padding: 8px;
}
    
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 1300px) {
    font-size: 0.7rem;
    padding: 8px;
    margin-top: 20px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const Message = styled.p`
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.success ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.success ? "#155724" : "#721c24")};
`;

/* 🔹 DatePicker Styling */
export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: 1rem;
    color: #333;
    font-weight: bold;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;

    &::placeholder {
      color: #ccc;
      font-weight: 300;
    }

    @media (max-width: 1300px) {
      font-size: 0.7rem;
      padding: 8px;
    }
  }
`;


