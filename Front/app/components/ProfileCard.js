import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'



export const ProfileCard = (props) =>{
    const {imageLink, name, age, city} = props
    return (
     <Card>
       <Image src={imageLink}  ui={false} wrapped />
       <Card.Content>
         <Card.Header>{name}</Card.Header>
         <Card.Meta>
           <span className='date'>{age} years old</span>
        </Card.Meta>
         <Card.Description>
           {city}
         </Card.Description>
       </Card.Content>
       <Card.Content extra textAlign="right">
           <a><Icon name='heart' color='red' />Like</a>
       </Card.Content>
     </Card>
    )
}


