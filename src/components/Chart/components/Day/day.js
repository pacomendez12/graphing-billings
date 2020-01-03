import React, { useState } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import "./day.css";
import { DisplayModes } from "../../Constants";
import { ReactComponent as DeleteDay } from "../../../../img/delete_day.svg";
import { ReactComponent as AddDayBefore } from "../../../../img/add_day_before.svg";
import { ReactComponent as AddDayAfter } from "../../../../img/add_day_after.svg";
import { ReactComponent as EditDay } from "../../../../img/edit_day.svg";

function EditMenu(props) {
  return (
    <div className="edit-menu-popover">
      <div
        title="Agregar un día antes"
        className="icon-container"
        onClick={() => {
          props.addDayOnIdx(props.idxDay);
          props.setEditPopoverIsOpen(false);
        }}
      >
        <AddDayBefore />
      </div>
      <div
        className="icon-container"
        title="Editar día"
        onClick={() => {
          props.setEditPopoverIsOpen(false);
          setTimeout(() => {
            props.openEditor(props.idxDay);
          }, 40);
        }}
      >
        <EditDay />
      </div>
      <div
        className="icon-container"
        title="Borrar día"
        onClick={() => {
          props.setEditPopoverIsOpen(false);
          setTimeout(() => {
            props.dropDay(props.idxDay);
          }, 40);
        }}
      >
        <DeleteDay />
      </div>
      <div
        className="icon-container"
        title="Agregar un día después"
        onClick={() => {
          props.addDayOnIdx(props.idxDay + 1);
          props.setEditPopoverIsOpen(false);
        }}
      >
        <AddDayAfter />
      </div>
    </div>
  );
}

const position = ["top", "bottom", "left", "right"];

export default function Day(props) {
  const [editPopoverIsOpen, setEditPopoverIsOpen] = useState(false);

  if (props.displayMode === DisplayModes.EDIT) {
    return (
      <Popover
        isOpen={editPopoverIsOpen}
        position={position}
        onClickOutside={() => setEditPopoverIsOpen(false)}
        padding={3}
        content={({ position, targetRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={"#dbdbdb"}
            arrowSize={7}
            arrowStyle={{ opacity: 1 }}
          >
            <EditMenu
              idxDay={props.idxDay}
              dropDay={props.dropDay}
              addDayOnIdx={props.addDayOnIdx}
              openEditor={props.openEditor}
              setEditPopoverIsOpen={setEditPopoverIsOpen}
            />
          </ArrowContainer>
        )}
      >
        {
          <div
            className="item-field item-day item-day-mutable"
            onClick={() => setEditPopoverIsOpen(true)}
            style={{ cursor: "pointer" }}
            title={"Opciones"}
          >
            {props.day || 1}
          </div>
        }
      </Popover>
    );
  } else {
    return (
      <div className="item-field item-day" style={{ cursor: "pointer" }}>
        {props.day || ""}
      </div>
    );
  }
}
