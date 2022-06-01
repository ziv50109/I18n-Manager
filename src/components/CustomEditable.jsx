import {
  Input,
  HStack,
  Editable,
  IconButton,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from '@chakra-ui/react';
import {
  CheckIcon,
  EditIcon,
} from '@chakra-ui/icons';

const noop = () => {};
const EditableControls = ({
  renderCheckButton = noop,
  renderEditButton = noop,
}) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  const DefaultEditIconButton = (props) => (
    <IconButton size="xs" icon={<EditIcon />} {...getEditButtonProps()} {...props} />
  );
  const DefaultCheckIconButton = (props) => (
    <IconButton size="xs" icon={<CheckIcon />} {...getSubmitButtonProps()} {...props} />
  );

  const _renderEditButton = () => (
    renderEditButton === noop
      ? <DefaultEditIconButton />
      : renderEditButton(DefaultEditIconButton, getEditButtonProps)
  );
  const _renderCheckButton = () => (
    renderCheckButton === noop
      ? <DefaultCheckIconButton />
      : renderCheckButton(DefaultCheckIconButton, getSubmitButtonProps)
  );

  return (
    isEditing
      ? _renderCheckButton()
      : _renderEditButton()
  );
};

export const CustomEditable = ({
  renderEditButton = noop,
  renderCheckButton = noop,
  inputProps = {},
  ...others
}) => {
  const EditableControlsProps = {
    renderEditButton,
    renderCheckButton,
  };

  return (
    <Editable
      isPreviewFocusable={false}
      {...others}
    >
      <HStack>
        <EditablePreview />
        <Input as={EditableInput} {...inputProps} />
        <EditableControls {...EditableControlsProps} />
      </HStack>
    </Editable>
  );
};
