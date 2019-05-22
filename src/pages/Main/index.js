import React, { Component } from 'react'
import moment from 'moment'
import api from '../../services/api'

import logo from '../../assets/logo.png'

import { Container, Form } from './styles'

import CompareList from '../../components/CompareList'

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  }

  handleAddRepository = async (e) => {
    const { repositoryInput } = this.state
    e.preventDefault()

    this.setState({ loading: true })

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`)

      repository.lastCommit = moment(repository.pushed_at).fromNow()

      this.setState({
        repositoryInput: '',
        repositories: [...this.state.repositories, repository],
        repositoryError: false,
      })
    } catch(err) {
      this.setState({ repositoryError: true })
    } finally {
      this.setState({ loading: false })
    }
  }

  handleRemoveRepository = (id) => {
    const { repositories } = this.state
    
    this.setState({
      repositories: repositories.filter(repository => repository.id !== id)
    })
  }

  render() {
    const {
      loading,
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
          <button type='submit'>
            { loading ? <i className='fa fa-spinner fa-pulse' /> : 'ok' }
          </button>
        </Form>

        < CompareList removeRepository={this.handleRemoveRepository} repositories={repositories} />
      </Container>
    )
  }
}