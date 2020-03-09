import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './semantic.css'

const categoryOptions = [
  {
    key: 'handbags',
    text: 'handbags',
    value: 'handbags',
  },
  {
    key: 'wallets',
    text: 'wallets',
    value: 'wallets',
  },
  {
    key: 'slgs',
    text: 'slgs',
    value: 'slgs',
  },
  {
    key: 'rtw',
    text: 'rtw',
    value: 'rtw',
  },
  {
    key: 'watches',
    text: 'watches',
    value: 'watches',
  },
  {
    key: 'shoes',
    text: 'shoes',
    value: 'shoes',
  },
  {
    key: 'eyewear',
    text: 'eyewear',
    value: 'eyewear',
  },
  {
    key: 'jewelry',
    text: 'jewelry',
    value: 'jewelry',
  },
]
const seasonOptions = [
  {
    key: 'pre spring',
    text: 'pre spring',
    value: 'pre spring',
  },
  {
    key: 'spring summer',
    text: 'spring summer',
    value: 'spring summer',
  },
  {
    key: 'pre fall',
    text: 'pre fall',
    value: 'pre fall',
  },
  {
    key: 'fall winter',
    text: 'fall winter',
    value: 'fall winter',
  },
]
const yearOptions = [
  {
    key: '2020',
    text: '2020',
    value: '2020',
  },
  {
    key: '2021',
    text: '2021',
    value: '2021',
  },
  {
    key: '2022',
    text: '2022',
    value: '2022',
  },
  {
    key: '2023',
    text: '2023',
    value: '2023',
  },
  {
    key: '2024',
    text: '2024',
    value: '2024',
  },
  {
      key: '2025',
      text: '2025',
      value: '2025',
    },


]


export const CategoryDropdown = () => (
  <Dropdown
    placeholder='Category'
    fluid
    search
    selection
    options={categoryOptions}
  />
)
export const SeasonDropdown = () => (
  <Dropdown
    placeholder='Season*'
    fluid
    search
    selection
    options={seasonOptions}
  />
)
export const YearDropdown = () => (
  <Dropdown
    placeholder='Year*'
    fluid
    search
    selection
    options={yearOptions}
  />
)
