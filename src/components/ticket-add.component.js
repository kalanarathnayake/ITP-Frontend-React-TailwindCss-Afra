import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class CreateTicket extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            id: '',
            description: '',
            subject: '',
            date: new Date()
        }
    }


    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeId(e) {
        this.setState({
            id: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const ticket = {
            name: this.state.name,
            id: this.state.id,
            description: this.state.description,
            subject: this.state.subject,
            date: this.state.date
        }

        console.log(ticket);
        if (this.state.name.length < 5) {
            this.setState({ nameError: "Student Name should be longer than 3 characters." })
        }
        else if (this.state.id.length < 4) {
            this.setState({ idError: "Invalid ID." })
        }
        else if (this.state.description.length < 10) {
            this.setState({ descriptionError: "Student Name should be longer than 5 words." })
        }
        else if (this.state.subject.length < 10) {
            this.setState({ subjectError: "Write a propper subject." })
        }
        else if (this.state.date.length < 1) {
            this.setState({ dateError: "Select date." })
        } else {
            axios.post('http://localhost:5000/ticket/add', ticket)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'ticket has been created!!',
                            background: '#fff',
                            confirmButtonColor: '#133EFA',
                            iconColor: '#60e004'
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in creating!',
                            background: '#fff',
                            confirmButtonColor: '#133EFA',
                            iconColor: '#e00404'
                        })
                    }
                })
        }
    }

    clearData = () => {
        this.setState({
            name: '',
            id: '',
            description: '',
            subject: '',
            date: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Raise a Ticket
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Name : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control "
                                                        value={this.state.name}
                                                        onChange={this.onChangeName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.nameError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Student ID Number : </label>
                                                    <input type="text"
                                                        required
                                                        placeholder=''
                                                        className="form-control"
                                                        value={this.state.id}
                                                        onChange={this.onChangeId}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.idError}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Subject : </label>
                                                    <div>
                                                        <input type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.subject}
                                                            onChange={this.onChangeSubject}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.subjectError}</p>
                                                    </div>
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Description : </label>
                                                    <div>
                                                        <textarea type="text"
                                                            required
                                                            placeholder=''
                                                            className="form-control"
                                                            value={this.state.description}
                                                            onChange={this.onChangeDescription}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.descriptionError}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Date: </label>
                                                <DatePicker
                                                    className='m-2'
                                                    selected={this.state.date}
                                                    onChange={this.onChangeDate}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.dateError}</p>
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Raise Ticket" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}