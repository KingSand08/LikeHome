"use client";
import TemplateInput from "../../Templates-UI/TemplateInput";

type SearchBarProps = {
  selectedQuery: string;
  onChange: (query: string) => void;
};

const regex = /^[\s\S]*$/;

const SearchBar: React.FC<SearchBarProps> = ({ selectedQuery, onChange }) => {
  return (
    <TemplateInput
      title="Region Search Query"
      placeholder="Enter region search query"
      regex={regex}
      value={selectedQuery}
      onChange={onChange}
      required
    />
  );
};

export default SearchBar;
