import React, { useState } from 'react'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { ChangeEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '@/components/UI/Button'
import Dropdown from '@/components/UI/Dropdown'

interface IInput {
  placeholder?: string
  value?: string | number
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: string
  error?: string
  name: string
  class?: string
}
const InputComp = (props: IInput) => {
  return (
    <>
      <input
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={twMerge(
          `px-3 py-4 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text`,
          props.class
        )}
      />
      {props.error && <div className="mt-3 text-rose-500">{props.error}</div>}
    </>
  )
}

const options = ['Dropdown1', 'Dropdown2', 'Dropdown3']

const Features = () => {
  const [selectedfeatures, setSelectedFeature] = useState<string | undefined>(options[0])

  const initialValues = {
    title: '',
    description: '',
    enableFeature: '',
    issuerFeature: '',
    taxon: '',
  }

  type IFeatureData = typeof initialValues

  let schema = object({
    title: string().required(''),
    description: string().required(''),
    enableFeature: string().required(''),
    issuerFeature: string().required(''),
    taxon: string().required(''),
  })

  const formik = useFormik<IFeatureData>({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: () => {},
  })

  return (
    <div className="w-full max-w-[840px]">
      <div className="flex flex-col md:flex-row w-full   gap-y-2  md:items-center md:justify-between">
        <p className="text-xl sm:text-2xl font-semibold">Create Feature Pack</p>
      </div>
      <div className=" w-full inline-block align-middle ">
        <div className="overflow-auto shadow-shadow-tertiary rounded-lg px-8 py-12 bg-white mt-4">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-7">
            <div className=" flex flex-col md:flex-row justify-between items-left md:items-center gap-4 md:gap-10 ">
              <div className=" md:w-3/12 text-2xl font-semibold">Title</div>
              <InputComp
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
                class="flex-1"
              />
            </div>
            <div className=" flex flex-col md:flex-row justify-between items-left md:items-center gap-4 md:gap-10 ">
              <div className=" md:w-3/12 text-2xl font-semibold">Description</div>
              <InputComp
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.errors.description}
                class="flex-1"
              />
            </div>
            <div className=" flex flex-col md:flex-row justify-between items-left md:items-center gap-4 md:gap-10 ">
              <div className=" md:w-3/12 text-2xl font-semibold">Enable Feature</div>
              {/* <InputComp
                name="enableFeature"
                value={formik.values.enableFeature}
                onChange={formik.handleChange}
                error={formik.errors.enableFeature}
                class="flex-1"
              /> */}
              <Dropdown
                selectedOption={selectedfeatures}
                setSelectedOption={setSelectedFeature}
                dropdownList={options}
                className="flex-1"
              />
            </div>
            <div className=" flex flex-col md:flex-row justify-between items-left md:items-center gap-4 md:gap-10 ">
              <div className=" md:w-3/12 text-2xl font-semibold">Issuer Address</div>
              <InputComp
                name="issuerFeature"
                value={formik.values.issuerFeature}
                onChange={formik.handleChange}
                error={formik.errors.issuerFeature}
                class="flex-1"
              />
            </div>
            <div className=" flex flex-col md:flex-row justify-between items-left md:items-center gap-4 md:gap-10 ">
              <div className=" md:w-3/12 text-2xl font-semibold">Taxon</div>
              <InputComp
                name="taxon"
                value={formik.values.taxon}
                onChange={formik.handleChange}
                error={formik.errors.taxon}
                class="flex-1"
              />
            </div>
            <div className="flex items-center gap-2 mt-4 sm:ml-28">
              <Button loading={false} type="submit" className="truncate px-4 py-2 rounded">
                {'Save'}
              </Button>
              <Button variant="blueOutline" className="px-4 py-2 rounded">
                {'Cancel'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Features
