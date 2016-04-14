package com.sastabackend.util;

/*
 * Copyright 2002-2006 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
        import java.sql.ResultSet;
        import java.sql.ResultSetMetaData;
        import java.sql.SQLException;
        import java.util.HashSet;
        import java.util.Set;
        import org.springframework.jdbc.core.RowMapper;

/**
 * RowMapper implementation that converts a row into a new instance of the
 * specified mapped class. Column values are mapped based on matching the column
 * name as obtained from result set metadata to public setters for the
 * corresponding properties. The names are matched either directly or by
 * transforming a name separating the parts with underscores to the same name
 * using "camel" case.
 *
 */
public abstract class BaseRowMapper<T extends Object> implements RowMapper<T> {

    private Set<String> setAvailableColumns;
    private ResultSet rs;
    private final String prefix;

    /**
     * Create a new ActiveRowMapper.
     */
    public BaseRowMapper() {
        prefix=Constants.Empty;
    }

    /**
     * Create a new ActiveRowMapper.
     */
    public BaseRowMapper(String prefix) {
        this.prefix = prefix;
    }

    private void init(ResultSet rs) throws SQLException {
        this.rs = rs;
        setAvailableColumns = new HashSet<String>(0);
        ResultSetMetaData meta = rs.getMetaData();
        for (int i = 1, n = meta.getColumnCount() + 1; i < n; i++)
            setAvailableColumns.add(meta.getColumnLabel(i));
    }

    @Override
    public T mapRow(ResultSet rs, int rowNum) throws SQLException {
        if (setAvailableColumns == null)
            init(rs);
        return mapRowImpl(rs, rowNum);
    }

    public abstract T mapRowImpl(ResultSet rs, int rowNum) throws SQLException;

    public boolean hasColumn(String columnName) {
        return (setAvailableColumns.contains(columnName));
    }

}