import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'

type Props = {
  onChangePage: (pageNumber: number) => void
}

export const Pagination = ({onChangePage}: Props) => {

  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      // onPageChange={event => console.log(event)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
