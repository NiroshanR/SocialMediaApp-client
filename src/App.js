import {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from './components/NavbarComponent'
import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import axios from 'axios'


function App() {
  const [users, setUsers] = useState([])


  useEffect(() =>{
    fetchUser()
  }, [])

  // This data should be fetched from a form
  const dummyUser ={
    first_name: 'lakshman',
    last_name: 'Raj',
    email: 'lakshman@gmail.com',
    avatar: 'https://reqres.in/img/faces/9-image.jpg'
  }

  const fetchUser = () => {
    axios.get('http://localhost:4000/users')   
    .then((response) => setUsers(response.data.data))
    .catch((error) => console.log(error.message))
  }

  const createNewUser = async() =>{
    axios.post('http://localhost:4000/users', dummyUser)   
    .then((response) => fetchUser())
    .catch((error) => console.log(error.message))
  }

  return (
    <div className="App">
      <NavbarComponent/>
      <Container>
        <Row>
          {users.map((user) => (
               <Col md={4} Key={user.id}>
                   <Card style={{ width: '18rem', margin: '10px auto'}}>
                      <Card.Img variant="top" src={user.avatar} />   
                        <Card.Body>
                            <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                            <Card.Text>
                              {user.email}
                            </Card.Text>
                            <Button variant="dark">Connect</Button>
                        </Card.Body>
                  </Card>       
              </Col>                
          ))}
        
        </Row>
        <Button variant='dark' onClick={createNewUser}>Add new user</Button>
      </Container>
    </div>
  );
}

export default App;
