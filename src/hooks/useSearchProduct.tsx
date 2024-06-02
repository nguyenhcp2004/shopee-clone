import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '~/utils/rule'
import { omit } from 'lodash'
import path from '~/constants/path'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])
export default function useSearchProduct() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmitSearch }
}
