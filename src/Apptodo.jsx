import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Apptodo = () => {
    const { register, handleSubmit, control, getValues, setValue, watch } = useForm({
        defaultValues: {
            gender: '',
            countries: '', // Initialize the country field
            city: '',      // Initialize the city field
        }
    });
    const countries = [
        {
            name: 'India',
            value: 'IN',
            cities: ['Delhi', 'Mumbai']
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

    // Reset city when country changes
    React.useEffect(() => {
        setValue("city", "");
    }, [selectedCountry, setValue]);

    return (
        <Box sx={{ textAlign: "center" }}>
            <h4>React CRUD With REDUX</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            {...register("name")}
                            margin="normal"
                            sx={{ width: "400px" }}
                        />
                        <TextField
                            label="Email"
                            {...register("email")}
                            margin="normal"
                            sx={{ width: "400px" }}
                        />
                        <TextField
                            label="Contact"
                            {...register("contact")}
                            sx={{ width: "400px" }}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ textAlign: 'left' }}>Gender</FormLabel>
                            <Controller
                                rules={{ required: true }}
                                control={control}
                                name="gender"
                                render={({ field }) => {
                                    return (
                                        <RadioGroup {...field}>
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio />}
                                                label="Other"
                                            />
                                        </RadioGroup>
                                    );
                                }}
                            />
                        </FormControl>

                        {/* Subject Selection (Checkboxes) */}
                        <FormControl>
                            <FormLabel sx={{ textAlign: "left" }}>Subjects</FormLabel>
                            <Stack direction="row">
                                <FormControlLabel control={<Checkbox {...register("subjects")} value="english" />} label="English" />
                                <FormControlLabel control={<Checkbox {...register("subjects")} value="hindi" />} label="Hindi" />
                                <FormControlLabel control={<Checkbox {...register("subjects")} value="gujarati" />} label="Gujarati" />
                            </Stack>
                        </FormControl>
                        {/* Country Selection */}
                        <TextField select fullWidth label="Country" {...register('countries')}>
                            {countries.map((option) => (
                                <MenuItem key={option.value} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* City Selection - updates dynamically based on country */}
                        <TextField select fullWidth label="City" {...register('city')} disabled={!selectedCountry}>
                            {countryData?.cities.map((city) => (
                                <MenuItem key={city} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Box>

                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default Apptodo;
