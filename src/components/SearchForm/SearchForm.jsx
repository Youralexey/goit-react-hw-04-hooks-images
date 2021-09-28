import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  CustomSearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./SearchForm.styled";
import PropTypes from "prop-types";

export default function SearchForm({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleInputValue = (e) => {
    setValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      // alert('Введите название картинки.');
      toast.error("Input picture`s name.");
      return;
    }
    onSubmit(value);
    resetInput();
  };

  const resetInput = () => {
    setValue("");
  };

  return (
    <CustomSearchForm onSubmit={handleSubmit}>
      <SearchFormButton type="submit">
        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
      </SearchFormButton>
      <SearchFormInput
        type="text"
        value={value}
        placeholder="Search images and photos"
        autocomplete="off"
        onChange={handleInputValue}
      />
      <Toaster />
    </CustomSearchForm>
  );
}

SearchForm.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
