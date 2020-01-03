import React from "react";
import "./help.css";
import Shortcut from "./components/Shortcut";
import { ReactComponent as CloseIcon } from "../../img/close.svg";

export default function Help(props) {
  return (
    <div className="help-main">
      <div className="top-bar">
        <div className="title">Ayuda</div>
        <button
          className="close-button"
          onClick={() => {
            props.onClose();
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="help-body">
        <div className="help-item">
          <Shortcut shortcutText="ctl + c" description="Copiar" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="ctl + v" description="Pegar" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="ctl + +" description="Insertar nuevo día" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="ctl + -" description="Eliminar día" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="Inicio" description="Ir al día 1" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="Fin" description="Ir al último día" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="F5" description="Iniciar modo presentación" />
        </div>
        <div className="help-item">
          <Shortcut
            shortcutText="Esc"
            description="Salir del modo presentación"
          />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="&#8592;" description="Retroceder un día" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="&#8594;" description="Avanzar un día" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="Re Pág" description="Retroceder 5 días" />
        </div>
        <div className="help-item">
          <Shortcut shortcutText="Av Pág" description="Avanzar 5 días" />
        </div>
      </div>
    </div>
  );
}
