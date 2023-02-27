import React, { useEffect, useState } from 'react';
import {Text,Image,Button,Skeleton,Stack,Flex,Select, Grid, Box,} from '@chakra-ui/react';
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function UserDetails() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState('')

  useEffect(() => {

    getData(page)
      .then((r) => {
        setData(r)
        setLoading(false)
      })
  }, [page, gender]);

  const getData = async (page = 1, filter = gender) => {
    setLoading(true)
    try {
      let res = await axios(`https://heartbreaking-sheer-papyrus.glitch.me/getUsers/userlist?page${page}&filter=${filter}`);
      return res.data
    } catch (e) {
      console.log(e.message);
    }
  }

  const changepage = (v) => {
    setPage(page + v)
  }

  const changegender = async (v, page = 1) => {
    setGender(v)
    setPage(1)
    let res = await axios(`https://heartbreaking-sheer-papyrus.glitch.me/getUsers/userlist?page${page}&filter=${v}`);
    setData(res.data)
  }

  return (
    <Box minHeight="100vh">
      <Box textAlign="left" padding='20px'>
        <Link to={'/'}>
          <Button position={'relative'}>Home</Button>
        </Link>
      </Box>
      <Flex w="80vw" margin="auto" direction="column" gap="20px"marginBottom="10px">
        <Flex justifyContent={'center'} alignItems="center" gap="20px" >
          <Button isDisabled={page === 1} bg={'green.400'} onClick={() => changepage(-1)}>Prev</Button>
          <Text fontSize={'16px'}>Page: {page}</Text>
          <Button isDisabled={Math.ceil(data.length / 2) - 1 <= 1} bg={'green.400'} onClick={() => changepage(1)}>Next</Button>
        </Flex>
        <Select onChange={(e) => changegender(e.target.value)} placeholder='Filter by gender' style={{width:"300px"}}>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
        </Select>
      </Flex>
      <Grid templateColumns="repeat(5,1fr)" gap="30px" w="80%" margin="auto">
        {
          data && !loading && data.map((ele, i) => (
            <Flex key={i} direction="column" fontSize="12px" gap="10px" padding="10px" backgroundColor="rgb(243,202,197)" borderRadius="10px" boxShadow="2xl">
              <Image borderRadius={'8px'} w="100%" h="180px" src={ele.picture.large} alt='' />
              <Text as={'b'}>Gender: {ele.gender}</Text>
              <Text as={'b'}>Name: {ele.name.title}. {ele.name.first} {ele.name.last}</Text>
              <Text as={'b'}>Email: {ele.email}</Text>
              <Text as={'b'}>Country: {ele.location.country}</Text>
            </Flex>
          ))
        }
      </Grid>
      {
        !data.length && <Text as={'b'} fontSize={'3xl'}>No users found</Text>
      }
      {
        loading && <Stack >
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
        </Stack>
      }
    </Box>
  )
}
