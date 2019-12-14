import React, { useState } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./day.css";
import { DisplayModes } from "../../Constants";
import { ReactComponent as DeleteDay } from "../../../../img/delete_day.svg";
import { ReactComponent as AddDayBefore } from "../../../../img/add_day_before.svg";
import { ReactComponent as AddDayAfter } from "../../../../img/add_day_after.svg";

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
        title="Borrar día"
        onClick={() => {
          confirmAlert({
            title: `Eliminar día ${props.idxDay + 1}`,
            message: "¿Estás seguro que quieres eliminar este día?",
            buttons: [
              {
                label: "Si",
                onClick: () => props.dropDay(props.idxDay)
              },
              {
                label: "No"
              }
            ]
          });

          props.setEditPopoverIsOpen(false);
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

export default function Day(props) {
  const [editPopoverIsOpen, setEditPopoverIsOpen] = useState(false);

  if (props.displayMode === DisplayModes.EDIT) {
    return (
      <Popover
        isOpen={editPopoverIsOpen}
        position={["top", "bottom", "left", "right"]}
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
              setEditPopoverIsOpen={setEditPopoverIsOpen}
            />
          </ArrowContainer>
        )}
      >
        {
          <div
            className="item-field item-day"
            onClick={() => setEditPopoverIsOpen(true)}
            // onMouseEnter={() => setEditPopoverIsOpen(true)}
            // onMouseLeave={() => setEditPopoverIsOpen(false)}
            style={{ cursor: "pointer" }}
            title={"Editar día"}
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
