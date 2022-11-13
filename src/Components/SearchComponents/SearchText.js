import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "../../hooks/debounceHook";
import ShowProducts from "./ShowProducts";
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence, motion }from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import '../../styles/searchText.css'

const containerVariants = {
  expanded: {
    height: "30em",
  },
  collapsed: {
    height: "30em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

const SearchText = () => {
  const [isExpanded, setExpanded] = useState(false);
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  
  const isEmpty = !products || products.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoProducts(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNoProducts(false);
    setProducts([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `http://localhost:8080/products/search/${query}`;

    return encodeURI(url);
  };

  const searchTvShow = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNoProducts(false);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      console.log("Response: ", response.data);
      if (response.data && response.data.length === 0) setNoProducts(true);

      setProducts(response.data);
    }

    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchTvShow);

  return (
    <motion.div className='search_bar'
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <div className='container_input'>
        <span className='icon_search'>
          <IoSearch />
        </span>
        <input
          className='search_input'
          placeholder="Wyszukaj produkt"
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <span className='icon_close'
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </span>
          )}
        </AnimatePresence>
      </div>
      {isExpanded && <span className='separator' />}
      {isExpanded && (
        <div className='content'>
          {isLoading && (
            <div className='loading'>
              <MoonLoader loading color="#000" size={20} />
            </div>
          )}
          {!isLoading && isEmpty && !noProducts && (
            <div className='loading'>
              <span className='warning'>Zacznij pisać, aby wyszukać!</span>
            </div>
          )}
          {!isLoading && noProducts && (
            <div className='loading'>
              <span className='warning'>Nie znaleziono wyszukiwanego produktu!</span>
            </div>
          )}
          {!isLoading && !isEmpty && (
            <>
              {products.map((show) => (
                <ShowProducts
                  key={show.id}
                  idProduct={show.id}
                  name={show.name}
                  price={show.price}
                />
              ))}
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default SearchText