import React, { useState } from 'react';
import { addtodo } from './redux/slices/appSlice';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { ApptodoTable } from './ApptodoTable';

const Apptodo = () => {
    const dispatch = useDispatch();
    const [dataFromChild, setDataFromChild] = useState("");
    const { register, handleSubmit, control, getValues, setValue, watch, formState: { errors }, clearErrors, reset } = useForm({
        mode: "onChange",// Enables real-time validation
        defaultValues: {
            name: '',
            email: '',
            contact: '',
            gender: '',
            countries: '',
            city: '',
            subjects: [],
        }
    });
    const [openPopup, setOpenPopup] = useState(false)
    const countries = [
        {
            name: 'India',
            value: 'IN',
            cities: ['Delhi', 'Mumbai', 'Surat']
        },
        {
            name: 'Pakistan',
            value: 'PK',
            cities: ['Lahore', 'Karachi']
        },
        {
            name: 'Bangladesh',
            value: 'BG',
            cities: ['Dhaka', 'Chittagong']
        }
    ];

    const onSubmit = (data) => {
        dispatch(addtodo(data))
        reset()
    };

    const selectedCountry = watch("countries");  // ✅ Watches country selection in real-time
    const countryData = countries.find(c => c.name === selectedCountry);

    // Reset city when country changes
    React.useEffect(() => {
        setValue("city", "");
        clearErrors("city")
    }, [selectedCountry, setValue]);

    // Handle clearing the error when city is selected
    React.useEffect(() => {
        if (selectedCountry && getValues("city")) {
            clearErrors("city"); // Clear error when both country and city are selected
        }
    }, [selectedCountry, getValues, clearErrors]);

    // Handle clearing the country error when a country is selected
    React.useEffect(() => {
        if (selectedCountry) {
            clearErrors("countries"); // Clear error when a country is selected
        }
    }, [selectedCountry, clearErrors]);

    const handleEditList = (data) => {
        console.log(data)
        reset(data);
        setValue("subjects", data.subjects || []);
    }
    console.log("updatedData", getValues())
    return (
        <Container sx={{ textAlign: "center", mt: 5, backgroundColor:"red" }} >
            <Box sx={{ textAlign: "right" }}>
                <Button
                    c variant="outlined"
                    color="primary"
                    onClick={() => setOpenPopup(true)}>
                    Add TODO
                </Button>
                <Dialog open={openPopup} onClose={() => setOpenPopup(false)} aria-labelledby="dialog-title">
                    <DialogTitle id="dialog-title">Add New Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter the task details below:</DialogContentText>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Name"
                                        {...register("name", { required: "Name is required" })}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        margin="normal"
                                        sx={{ width: "400px" }}
                                    />
                                    <TextField
                                        label="Email"
                                        {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" } })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        margin="normal"
                                        sx={{ width: "400px" }}
                                    />
                                    <TextField
                                        label="Contact"
                                        {...register("contact",
                                            {
                                                required: "Number is required",
                                                validate: (value) => {
                                                    if (!/^[0-9]+$/.test(value)) return "Only numbers are allowed";
                                                    if (value.length !== 10) return "Contact must be exactly 10 digits";
                                                }
                                            })}
                                        error={!!errors.contact}
                                        helperText={errors.contact?.message}
                                        sx={{ width: "400px" }}
                                    />
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" sx={{ textAlign: "left" }}>Gender</FormLabel>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            rules={{ required: "Gender is required" }}
                                            render={({ field }) => (
                                                <RadioGroup {...field}>
                                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                </RadioGroup>
                                            )}
                                        />
                                        {errors.gender && (
                                            <Box sx={{ color: '#d32f2f', fontSize: '12px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'left' }}>
                                                {errors.gender.message}
                                            </Box>
                                        )}
                                    </FormControl>

                                    {/* Subject Selection (Checkboxes) */}
                                    {/* Subjects Selection */}
                                    <FormControl>
                                        <FormLabel>Subjects</FormLabel>
                                        <Stack direction="row">
                                            <Controller
                                                name="subjects"
                                                control={control}
                                                rules={{ validate: value => value.length > 0 || "Select at least one subject" }}
                                                render={({ field }) => (
                                                    <>
                                                        {["english", "hindi", "gujarati"].map(subject => (
                                                            <FormControlLabel
                                                                key={subject}
                                                                control={
                                                                    <Checkbox
                                                                        checked={field.value.includes(subject)}
                                                                        onChange={(e) => {
                                                                            const newValue = e.target.checked
                                                                                ? [...field.value, subject]
                                                                                : field.value.filter(s => s !== subject);
                                                                            field.onChange(newValue);
                                                                        }}
                                                                    />
                                                                }
                                                                label={subject.charAt(0).toUpperCase() + subject.slice(1)}
                                                            />
                                                        ))}
                                                    </>
                                                )}
                                            />
                                        </Stack>
                                        {errors.subjects && <Box sx={{ color: '#d32f2f', fontSize: '12px' }}>{errors.subjects.message}</Box>}
                                    </FormControl>
                                    {/* Country Selection */}
                                    <TextField
                                        select fullWidth label="Country"
                                        {...register('countries', { required: "Country is required" })}
                                        error={!!errors.countries}
                                        helperText={errors.countries?.message}
                                    >
                                        {countries.length > 0 ? (
                                            countries.map((option) => (
                                                <MenuItem key={option.value} value={option.name}>
                                                    {option.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">No options available</MenuItem>
                                        )}
                                    </TextField>

                                    {/* City Selection - updates dynamically based on country */}
                                    <TextField
                                        select fullWidth label="City"
                                        {...register('city', { required: "City is required" })}
                                        error={!!errors.city}
                                        helperText={errors.city?.message}
                                    // disabled={!selectedCountry}
                                    >
                                        {countryData?.cities?.map((city) => (
                                            <MenuItem key={city} value={city}>
                                                {city}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>

                            </Box>
                            <DialogActions >
                                <Button onClick={() => setOpenPopup(false)} color="secondary">
                                    Cancel
                                </Button>
                                <Button type='submit' color="primary" variant="contained">
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>
            <ApptodoTable onEdit={() => setOpenPopup(true)} sendDataToParent={handleEditList} />
        </Container>

    );
};

export default Apptodo;
