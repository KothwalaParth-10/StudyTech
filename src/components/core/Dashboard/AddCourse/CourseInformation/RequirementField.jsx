import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

function RequirementField({ name, label, register, errors, setValue, getValues }) {
  const [requirement, setRequirement] = useState("");
  const [requirementlist, setRequirementlist] = useState([]);
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0
    })
  }, [])

  useEffect(() => {
    setValue(name, requirementlist)
  }, [requirementlist])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementlist([...requirementlist, requirement]);
      setRequirement("");
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementlist];
    updatedRequirementList.splice(index, 1);
    setRequirementlist(updatedRequirementList);
  }


  return (
    <div className="flex flex-col space-y-2">

      <label className="text-sm text-richblack-5" htmlFor={name}>{label}</label>
      <div  className="flex flex-col items-start space-y-2">
        <input className="form-style w-full" type='text' id={name} value={requirement} onChange={(e) => {
          setRequirement(e.target.value);
        }}></input>

        <button type='button' onClick={handleAddRequirement} className="font-semibold text-yellow-50">
          Add
        </button>
      </div>
      {
        requirementlist.length > 0 && (
          <ul className="mt-2 list-inside list-disc">
            {
              requirementlist.map((requirement, index) => {
                return (<li key={index}className="flex items-center text-richblack-5">
                  <span>{requirement}</span>
                  <button onClick={() => {
                    handleRemoveRequirement(index)
                  }} type='button' className="ml-2 text-xs text-pure-greys-300 ">
                    clear
                  </button>
                </li>
                )
              })
            }
          </ul>
        )

      }
      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }

    </div>
  )
}

export default RequirementField