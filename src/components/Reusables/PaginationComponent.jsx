"use client";
import React from "react";
import ReactPaginate from "react-paginate";

// interface PaginationComponentProps {
// 	pageCount: number;
// 	onPageChange: (selected: number) => void;
// 	forcePage?: number;
// }

const PaginationComponent = ({ pageCount, onPageChange, forcePage = 0 }) => {
	return (
		<div className='flex flex-wrap justify-center bg-white w-full py-4'>
			<ReactPaginate
				pageCount={pageCount}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={(selected) => onPageChange(selected.selected + 1)}
				containerClassName='pagination'
				activeClassName='active'
				previousLabel='Prev'
				nextLabel='Next'
				forcePage={forcePage}
			/>
		</div>
	);
};

export default PaginationComponent;
