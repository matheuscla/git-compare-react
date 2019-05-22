import React, { Component } from 'react'
import moment from 'moment'
import api from '../../services/api'

import logo from '../../assets/logo.png'

import { Container, Form } from './styles'

import CompareList from '../../components/CompareList'

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  }

  handleAddRepository = async (e) => {
    const { repositoryInput } = this.state
    e.preventDefault()

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`)

      repository.lastCommit = moment(repository.pushed_at).fromNow()

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      })
    } catch(err) {
      this.setState({ repositoryError: true })
    }
  }

  render() {
    const {
      repositories,
      repositoryInput,
      repositoryError
    } = this.state

    return(
      <Container>
        <img src={logo} alt='Github Compare' />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
           type='text'
           placeholder='user/repository'
           value={repositoryInput}
           onChange={ e => this.setState({ repositoryInput: e.target.value })} />
          <button type='submit'>ok</button>
        </Form>

        < CompareList repositories={repositories} />
      </Container>
    )
  }
}