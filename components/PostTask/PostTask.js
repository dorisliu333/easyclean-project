import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button';
import FormItem from '../FormItem';
import { Form, Input, Error, validate } from '../Input';
import requestApi from '../../api/fetchDetails';

const initialData = {
  value: '',
  blurred: false,
  touched: false,
  focused: false,
};

class PostTask extends Component {
  constructor(props) {
    super(props);

    const { taskId, onClose, edit } = props;

    if (taskId) {
      requestApi
        .get(`/tasks/${taskId}`)
        .then((res) => {
          this.handleDataChange(res, taskId, edit);
        })
        .catch(() => {});
    }

    this.state = {
      data: {
        taskTitle: initialData,
        taskDetail: initialData,
        taskCategory: initialData,
        postCode: initialData,
        dueDate: initialData,
        workingTime: initialData,
        priceBudget: initialData,
      },
      taskId: taskId || undefined,
      isFormSubmit: false,
      closeModal: onClose,
      edit: !!edit,
    };

    this.handleIsFormSubmitChange = this.handleIsFormSubmitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
    this.handleBlurredChange = this.handleBlurredChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
  }

  handleDataChange(event, taskId, edit) {
    const { title, detail, category, postCode, dueDate, workingTime, priceBudget } = event.data;
    this.setState({
      data: {
        taskTitle: { value: title },
        taskDetail: { value: detail },
        taskCategory: { value: category },
        postCode: { value: postCode },
        dueDate: { value: dueDate },
        workingTime: { value: workingTime },
        priceBudget: { value: priceBudget },
      },
      taskId,
      edit,
    });
  }

  handleIsFormSubmitChange(newIsFormSubmit) {
    this.setState({
      isFormSubmit: newIsFormSubmit,
    });
  }

  handleSubmit(event, hasError) {
    event.preventDefault();
    this.handleIsFormSubmitChange(true);
    if (hasError) {
      return;
    }

    // submit
    const { closeModal, data, taskId, edit } = this.state;
    const { taskTitle, taskDetail, taskCategory, postCode, dueDate, workingTime, priceBudget } =
      data;
    const { userId } = this.props;

    const postData = {
      title: taskTitle.value,
      detail: taskDetail.value,
      category: taskCategory.value,
      postCode: postCode.value,
      dueDate: dueDate.value,
      workingTime: workingTime.value,
      priceBudget: priceBudget.value,
      clientId: userId,
    };

    if (taskId && edit) {
      requestApi
        .put(`/tasks/${taskId}`, postData)
        .then(() => {
          closeModal();
          window.location.reload(false);
        })
        .catch(() => {});
    } else {
      requestApi
        .post('/tasks', postData)
        .then(() => {
          closeModal();
          window.location.reload(false);
        })
        .catch(() => {});
    }
  }

  handleFocusedChange(event) {
    const { name } = event.target;
    this.setData(name, {
      focused: true,
    });
  }

  handleBlurredChange(event) {
    const { name } = event.target;
    this.setData(name, {
      blurred: true,
      focused: false,
    });
  }

  handleDatePicker(event, name) {
    const d = new Date(event);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();

    const formated = `${day}/${month}/${year}`;

    this.handleInputChange({
      target: {
        name,
        value: formated,
      },
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { data } = this.state;
    if ((name === 'postCode' || name === 'priceBudget') && Number.isNaN(Number(value))) {
      const prevPrice = data[name].value;
      this.setData(name, {
        prevPrice,
        touched: true,
      });
      return;
    }
    this.setData(name, {
      value,
      touched: true,
    });
  }

  setData(name, newData) {
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: {
          ...prevState.data[name],
          ...newData,
        },
      },
    }));
  }

  getErrorMessage(error, name) {
    const { data, isFormSubmit } = this.state;
    const showInputError = data[name].blurred;
    return (showInputError || isFormSubmit) && error[name];
  }

  getError() {
    const { data } = this.state;

    const error = {};
    Object.keys(data).forEach((name) => {
      const errorOfName = validate(name, data);
      if (!errorOfName) {
        return;
      }
      error[name] = errorOfName;
    });
    return error;
  }

  renderInput(data, error, e) {
    switch (e.tag) {
      case 'select':
        return (
          <Input
            name={e.key}
            as={e.tag}
            value={data[e.key].value}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusedChange}
            onBlur={this.handleBlurredChange}
            error={this.getErrorMessage(error, e.key)}
            id={`post-task-modal-${e.key}`}
          >
            {
              // <select> need children
              e.options.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.desc}
                </option>
              ))
            }
          </Input>
        );
      case 'DatePicker':
        return (
          <DatePicker
            name={e.key}
            placeholder={e.placeholder}
            value={data[e.key].value}
            minDate={new Date()}
            customInput={<Input />}
            onChange={(date) => this.handleDatePicker(date, e.key)}
            onFocus={this.handleFocusedChange}
            onBlur={this.handleBlurredChange}
            error={this.getErrorMessage(error, e.key)}
            id={`post-task-modal-${e.key}`}
          />
        );
      default:
        return (
          <Input
            name={e.key}
            as={e.tag}
            placeholder={e.placeholder}
            value={data[e.key].value}
            maxLength={e.maxlength}
            rows={e.rows}
            clos={e.cols}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusedChange}
            onBlur={this.handleBlurredChange}
            error={this.getErrorMessage(error, e.key)}
            id={`post-task-modal-${e.key}`}
          />
        );
    }
  }

  render() {
    const { data } = this.state;
    const { userId } = this.props;
    const error = this.getError(data);
    const hasError = Object.keys(error).length > 0;

    const categories = [
      { value: 0, desc: '-- select --' },
      { value: 'Home cleaning', desc: 'Home cleaning' },
      { value: 'End of lease', desc: 'End of lease' },
      { value: 'Steam cleaning', desc: 'Steam cleaning' },
      { value: 'Commercial', desc: 'Commercial' },
      { value: 'Pest control', desc: 'Pest control' },
      { value: 'Anything else', desc: 'Anything else' },
    ];

    const workTimes = [
      { value: 0, desc: '-- select --' },
      { value: 1, desc: 'Anytime' },
      { value: 2, desc: '6:00 to 10:00' },
      { value: 3, desc: '10:00 to 14:00' },
      { value: 4, desc: '14:00 to 18:00' },
      { value: 5, desc: '18:00 to 22:00' },
    ];

    return (
      <Form onSubmit={(e) => this.handleSubmit(e, hasError)}>
        {[
          {
            key: 'taskTitle',
            label: 'Task Title',
            tag: '',
            placeholder: 'Task title',
            maxlength: 30,
          },
          {
            key: 'taskDetail',
            label: 'Task Detail',
            tag: 'textarea',
            placeholder: 'Task detail',
            maxlength: 300,
            rows: 4,
            cols: 20,
          },
          {
            key: 'taskCategory',
            label: 'Category',
            tag: 'select',
            placeholder: '',
            maxlength: 15,
            options: categories,
          },
          { key: 'postCode', label: 'Postcode', tag: '', placeholder: 'Postcode', maxlength: 4 },
          {
            key: 'dueDate',
            label: 'Due Date',
            tag: 'DatePicker',
            placeholder: 'Due date',
            maxlength: 15,
          },
          {
            key: 'workingTime',
            label: 'Working Time',
            tag: 'select',
            placeholder: '',
            maxlength: 15,
            options: workTimes,
          },
          {
            key: 'priceBudget',
            label: 'Price Budget',
            tag: '',
            placeholder: 'Price budget',
            maxlength: 4,
          },
        ].map((e) => (
          <FormItem key={e.key} label={e.label} htmlFor={`post-task-modal-${e.key}`}>
            {this.renderInput(data, error, e)}
            <Error>{this.getErrorMessage(error, e.key)}</Error>
          </FormItem>
        ))}
        <Error>{!userId ? <span>Please login first before posting a task</span> : null}</Error>
        <Button size="lg" variant="green" type="Submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default PostTask;
