/**
 * A single cell
 */
export type Cell = 0 | 1;

/**
 * A single row of an 8x8 grid (8 cells)
 */
export type GridRow__8 = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

/**
 * An 8x8 grid, 8 rows with 8 cells each
 */
export type Grid__8x8 = [
    GridRow__8,
    GridRow__8,
    GridRow__8,
    GridRow__8,
    GridRow__8,
    GridRow__8,
    GridRow__8,
    GridRow__8,
];
