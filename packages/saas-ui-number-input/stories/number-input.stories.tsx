import { Container } from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { NumberInput } from '../src'

export default {
  title: 'Components/Forms/NumberInput',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => <NumberInput {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const HideStepper = Template.bind({})
HideStepper.args = {
  hideStepper: true,
}
