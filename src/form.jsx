import { useState, useEffect } from 'react';
import './App.css';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isFormFilled, setIsFormFilled] = useState(false);

    //handleChange function is used to update the state of the form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // useEffect hook is used to check if all fields are filled or not
    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
        setIsFormFilled(allFieldsFilled);
    }, [formData]);

    //handleSubmit function is used to validate the form fields
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            errors.email = 'Email is invalid';
        }        
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(formData.password)) {
            errors.password = 'Password must be minimum 6 characters, at least one letter, one number and one special character';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Password and Confirm Password must be same';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            alert('Form is submitted successfully');
        }
    };

    return (
        <div className="App">
            <h1>React Form Validation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder='Username'
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                    {formErrors.name && <span>{formErrors.name}</span>}
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='example@examplemail.com'
                        value={formData.email} 
                        onChange={handleChange}
                    />
                    {formErrors.email && <span>{formErrors.email}</span>}
                </div>
                <div>
                    <label>Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} />
                    {formErrors.password && <span>{formErrors.password}</span>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} o
                    onChange={handleChange} />
                    {formErrors.confirmPassword && <span>{formErrors.confirmPassword}</span>}
                </div>
                {isFormFilled && <button type="submit">Submit</button>}
            </form>
        </div>
    );
};

export default Form;