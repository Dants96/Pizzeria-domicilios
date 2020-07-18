-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 18-07-2020 a las 14:29:47
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `finalbd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_pizza` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `comentario` varchar(255) NOT NULL,
  `calificacion` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `producto_tamano` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `ID` int(11) NOT NULL,
  `pdd_fecha` date NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `pdd_puntuacion` smallint(6) NOT NULL,
  `pdd_completado` tinyint(1) NOT NULL,
  `pdd_descuento` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizzas`
--

CREATE TABLE `pizzas` (
  `ID` int(11) NOT NULL,
  `pz_nombre` varchar(50) NOT NULL,
  `pz_descripcion` varchar(200) NOT NULL,
  `pz_calificacion` float NOT NULL,
  `pz_precio_m` float NOT NULL,
  `pz_precio_g` float NOT NULL,
  `pz_foto` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pizzas`
--

INSERT INTO `pizzas` (`ID`, `pz_nombre`, `pz_descripcion`, `pz_calificacion`, `pz_precio_m`, `pz_precio_g`, `pz_foto`) VALUES
(1, 'Pizza Napolitana', 'La auténtica pizza italiana, tiene una masa suave y esponjosa, con un grosor medio,  tomate, queso, albahaca y aceite de oliva.', 5, 27000, 31000, 'images/menu/pz-napolitana.jpg'),
(2, 'Pizza Siciliana', 'la masa de esta pizza es más gruesa y se asemeja un poco al pan,salsa de tomates, queso remozarla, anchoas, alcaparras', 3.8, 38000, 45000, 'images/menu/pz-siciliana.jpg'),
(5, 'Pizza New York', 'Tiene una masa delgada pero no crujiente, queso Mozzarella, salsa de tomates.', 3.8, 15000, 21900, 'images/menu/pz-newyork.jpg'),
(6, 'Pizza Hawaiana', 'Los ingredientes principales son el jamón, la piña , queso y salsa de tomates.', 4.5, 20000, 28000, 'images/menu/pz-hawaiana.jpg'),
(7, 'Pizza Mexicana', 'Los ingredientes característicos de este manjar son: frijoles, chorizo y jalapeños; aunque en algunas partes también agregan trozos de jitomate, cebolla y salsa de tomates.', 5, 27000, 45000, 'images/menu/pz-mexicana.jpg'),
(8, 'Pizza Vegetariana', 'La pizza vegetariana en una opción para aquellas personas que no pueden o quieren comer carne, ingredientes: pimientos, cebolla, champiñones, aceituna negra, queso mozzarella y salsa de tomates.', 3.4, 31000, 45000, 'images/menu/pz-vegetariana.jpg'),
(9, 'Pizza Cuatro Quesos', 'Para los que aman el queso en cualquier estilo, esta pizza, además del mozzarella, lleva parmesano, cheddar y manchego.', 4.5, 31000, 47500, 'images/menu/pz-4quesos.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `usr_nombre` varchar(50) NOT NULL,
  `usr_apellido` varchar(50) NOT NULL,
  `usr_telefono` varchar(15) NOT NULL,
  `usr_email` varchar(50) NOT NULL,
  `usr_fecha` date NOT NULL,
  `usr_passwd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `usr_nombre`, `usr_apellido`, `usr_telefono`, `usr_email`, `usr_fecha`, `usr_passwd`) VALUES
(1, 'Daniel Alejandro', 'Tutistar', '3154591139', 'dan@yahoo.co', '1996-11-11', '$2y$10$KcFRG1pKShkVKx2TBTipqejlOqHUFtjQuexpUgjKSrWJuIE8XX7Ca'),
(21, 'Jessica ', 'Gomez Villota', '3165010537', 'jess@yahoo.co', '1997-01-05', '$2y$10$.X./X4Tx5KX60KAY5Z37cOhkgtecU8M0wZnI1uVNyUuQW4VtGK7Yu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD KEY `comentarios_fk0` (`id_pizza`),
  ADD KEY `comentarios_fk1` (`id_usuario`);

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD KEY `detalles_fk0` (`pedido_id`),
  ADD KEY `detalles_fk1` (`producto_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `pedidos_fk0` (`usuario_id`);

--
-- Indices de la tabla `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `usr_telefono` (`usr_telefono`),
  ADD UNIQUE KEY `usr_email` (`usr_email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_fk0` FOREIGN KEY (`id_pizza`) REFERENCES `pizzas` (`ID`),
  ADD CONSTRAINT `comentarios_fk1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`ID`);

--
-- Filtros para la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD CONSTRAINT `detalles_fk0` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`ID`),
  ADD CONSTRAINT `detalles_fk1` FOREIGN KEY (`producto_id`) REFERENCES `pizzas` (`ID`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_fk0` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
