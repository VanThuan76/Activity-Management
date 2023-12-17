import { useMutation, useQuery } from 'react-query'
import { Button, Form, Input, message, Modal, Row, Col, DatePicker, Select, SelectProps } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect } from 'react'
import { feedbackService } from '@/services/user.service'
import dayjs from 'dayjs'

interface Props {
    editId?: number
    open: any
    setOpen: any
    refetch: any
}