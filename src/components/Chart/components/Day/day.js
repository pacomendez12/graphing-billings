import React, { useState } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import "./day.css";
import { DisplayModes } from "../../Constants";
import { ReactComponent as EditDay } from "../../../../img/edit_day.svg";

function EditMenu(props) {
  return (
    <div className="edit-menu-popover">

      <div
        className="icon-container"
        title="Resolver día"
        onClick={() => {
          props.setEditPopoverIsOpen(false);
          setTimeout(() => {
            props.openEditor(props.idxDay);
          }, 40);
        }}
      >
        <EditDay />
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
