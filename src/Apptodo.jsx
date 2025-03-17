import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Apptodo = () => {
    const { register, handleSubmit, control, getValues, setValue, watch, formState: { errors }, clearErrors } = useForm({
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
        console.log("data", data);
    };

    const selectedCountry = watch("countries");  // ✅ Watches country selection in real-time
    const countryData = countries.find(c => c.name === selectedCountry);
    console.log("countryData", countryData?.cities?.length)

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

    return (
        <Box sx={{ textAlign: "center" }}>
            <h4>React CRUD With REDUX</h4>
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
                        <FormControl>
                            <FormLabel sx={{ textAlign: "left" }}>Subjects</FormLabel>
                            <Stack direction="row">
                                <FormControlLabel control={<Checkbox {...register("subjects", { required: "Select at least one subject" })} value="english" />} label="English" />
                                <FormControlLabel control={<Checkbox {...register("subjects")} value="hindi" />} label="Hindi" />
                                <FormControlLabel control={<Checkbox {...register("subjects")} value="gujarati" />} label="Gujarati" />
                            </Stack>
                            {errors.subjects && (<Box sx={{ color: '#d32f2f', fontSize: '12px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'left' }}>{errors.subjects.message}</Box>)}
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
                <Box sx={{ mt: 2 }} >
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Box>

            </form>
        </Box>
    );
};

export default Apptodo;
