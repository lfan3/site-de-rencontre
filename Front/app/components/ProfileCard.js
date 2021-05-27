import React from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import Moment from 'react-moment'


export const ProfileCard = (props) =>{
    const {photo_path, name, birthday, city} = props;
    const age = birthday;
    return (
     <Card>
       <Image src={photo_path}  ui={false} wrapped />
       <Card.Content>
         <Card.Header>{name}</Card.Header>
         <Card.Meta>
            
           <span className='date'> <Moment diff={birthday} unit="years" decimal={false}>{Date.now()}</Moment> years old</span>
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


