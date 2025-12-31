import React, { memo } from "react";
import type { Contact } from "../../types";
import "./PersonInfo.css";

interface PersonInfoProps {
  data: Contact;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const PersonInfo = memo(({ data, onSelect, isSelected }: PersonInfoProps) => {
  console.log("🔹 PersonInfo render:", data.id);
  const { id, firstNameLastName, jobTitle, emailAddress } = data;
  return (
    <div
      onClick={() => onSelect(id)}
      className={`person ${isSelected ? "selectedPerson" : ""}`}
    >
      <div className="personInfo">
        <div className="initials">{firstNameLastName.split(" ").slice(0, 2).map((word) => word[0])}</div>
        <div className="nameAndTitle">
          <div className="firstNameLastName">{firstNameLastName}</div>
          <div className="jobTitle">{jobTitle}</div>
        </div>
      </div>
      <div className="emailAddress">{emailAddress}</div>
    </div>
  );
})