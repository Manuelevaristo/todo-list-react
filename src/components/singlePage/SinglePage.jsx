import React, { useEffect, useState } from "react";
import "./SinglePage.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SinglePage() {
  const localizaation = useLocation();
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  console.log(taskInput);

  const path = localizaation.pathname.split("/")[2];
  useEffect(() => {
    const getTodo = async () => {
      try {
        const todo = await axios.get(`http://localhost:3000/todos/${path}`);
        setTitle(todo.data.task);
      } catch (error) {
        console.log(error);
      }
    };
    setEdit(false);
    getTodo();
  }, [path]);

  const deletar = async () => {
    try {
      await axios.delete(`http://localhost:3000/todos/${path}`);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Tens certeza!?",
      text: "Esta ação é irreversível!",
      icon: "Erro",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deletado!", "Deletado com sucesso.", "sucesso");
        deletar();
      }
    });
  };

  const addTasks = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/todos/${path}`, {
        task: taskInput,
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3600,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Editado com sucesso!",
      });
      setEdit(false);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  const aativEdit = () => {
    setEdit(true);
  };

  return (
    <div className="todo-container">
      <h1 className="title">ToDo List</h1>
      {!edit && (
        <>
          <h3>{title}</h3>
          <div className="allButtons">
            <button className="edit newButton" onClick={aativEdit}>
              Editar
            </button>
            <button className="delete newButton" onClick={confirmDelete}>
              Deletar
            </button>
          </div>
        </>
      )}
      {edit && (
        <form onSubmit={addTasks}>
          <input
            type="text"
            placeholder={title}
            onChange={(e) => setTaskInput(e.target.value)}
            minLength="3"
            required
          />

          <button className="adicionar" type="submit">
            Editar
          </button>
        </form>
      )}
      <Link to="/">
        <div className="Voltar">Voltar</div>
      </Link>
    </div>
  );
}
