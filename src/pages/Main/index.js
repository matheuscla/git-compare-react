import React from 'react'

import logo from '../../assets/logo.png'

import { Container, Form } from './styles'

import CompareList from '../../components/CompareList'

export default () => (
  <Container>
    <img src={logo} alt='Github Compare' />

    <Form>
      <input type='text' placeholder='user/repository' />
      <button>+</button>
    </Form>

    < CompareList />
  </Container>
)