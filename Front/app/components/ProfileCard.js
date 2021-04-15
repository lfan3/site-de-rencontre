import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

export const ProfileCard = (props) =>{
    const {imageLink, name, age, bio} = props
    return (
     <Card>
       <Image src={imageLink} wrapped ui={false} />
       <Card.Content>
         <Card.Header>{name}</Card.Header>
         <Card.Meta>
           <span className='date'>{age} years old</span>
         </Card.Meta>
         <Card.Description>
           {bio}
         </Card.Description>
       </Card.Content>
       <Card.Content extra textAlign="right">
           <a><Icon name='heart' color='red' />Like</a>
       </Card.Content>
     </Card>
    )
}


